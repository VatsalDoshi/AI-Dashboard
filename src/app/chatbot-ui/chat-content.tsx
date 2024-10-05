"use client";

import { useState, useRef } from "react";
import ChatInput from "@/components/chat-input";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { convertFileToBase64 } from "@/lib/utils";

export default function ChatContent() {
  const [assistantResponse, setAssistantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (value: string, file?: File) => {
    setIsLoading(true);
    setAssistantResponse("");

    let body = "";
    if (file) {
      const imageUrl = await convertFileToBase64(file);
      const messages = [
        {
          role: "user",
          content: `Please generate captions for the following image: ${imageUrl}`,
        },
      ];
      body = JSON.stringify({ messages });
    } else {
      const messages = [
        {
          role: "user",
          content: value,
        },
      ];
      body = JSON.stringify({ messages });
    }

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
        responseText += text; // Collect all parts of the response
      }

      // Beautify the response
      const beautifiedResponse = responseText
        .replace(/(\d+:)/g, "") // Remove numeric prefixes like "0:", "1:", etc.
        .replace(/e:\{.*?\}/g, "") // Remove metadata objects starting with "e:"
        .replace(/d:\{.*?\}/g, "") // Remove metadata objects starting with "d:"
        .replace(/["]+/g, "") // Remove unwanted quotation marks
        .replace(/[{}]+/g, "") // Remove any braces
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim(); // Trim any leading or trailing whitespace

      setAssistantResponse(beautifiedResponse); // Set the cleaned-up response
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
                  style={dark as any} // Correct typing for the style property
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
      <ChatInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </>
  );
}
