"use client";

import { useState, useRef } from "react";
import ExpandingInputText from "@/components/ExpandingInput";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatContentText() {
  const [assistantResponse, setAssistantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    setAssistantResponse("");

    const messages = [
      {
        role: "user",
        content: value,
      },
    ];
    const body = JSON.stringify({ messages });

    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch("/api/message", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let responseText = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const text = decoder.decode(value);
        responseText += text;
      }

      const beautifiedResponse = responseText
        .replace(/(\d+:)/g, "")
        .replace(/e:\{.*?\}/g, "")
        .replace(/d:\{.*?\}/g, "")
        .replace(/["]+/g, "")
        .replace(/[{}]+/g, "")
        .replace(/\s+/g, " ")
        .trim();

      setAssistantResponse(beautifiedResponse);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        alert("Error sending message");
      }
    }

    abortControllerRef.current = null;
    setIsLoading(false);
  };

  const handleStop = () => {
    if (!abortControllerRef.current) {
      return;
    }
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  };

  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-auto prose dark:prose-invert">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dark as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {assistantResponse}
        </Markdown>
      </div>
      <ExpandingInputText
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </>
  );
}
