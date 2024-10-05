"use strict";
// claude-3-5-sonnet-20240620
Object.defineProperty(exports, "__esModule", { value: true });
var anthropic_1 = require("@ai-sdk/anthropic");
var ai_1 = require("ai");
var text = (await (0, ai_1.generateText)({
    model: (0, anthropic_1.anthropic)('claude-3-haiku-20240307'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
})).text;
console.log(text);
