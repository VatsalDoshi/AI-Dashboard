# Clab AI -- Introductory Assignment

This is the official Clab AI introductory assignment repo scaffolded with T3 [T3 Stack](https://create.t3.gg/) bootstrapped with `create-t3-app`. 

Fork this repo and submit your assignment by your due date.

## Assignent: Simple Dashbaord

The goal of this assignment is to create a simple dashboard that allows users to create, read, update and delete simple posts and images. Additionally, they should have the ability to interact with the Vercel AI SDK to generate text and UI responses. Deploy this to Vercel.

For this assignment, you will use:

- NextJS 14 App Router (with Typescript) -- already set up for you
- Navigation (Side Navigation Bar) -- this you will need to add. Create 3 pages to navigate between:
    - A home page where a user can manage their posts and images

    - A page where a user can send a message to a generic chatbot that streams text back to them (use Vercel AI SDK)
    - A page where a user can send a message to a chatbot that streams a UI response (use Vercel AI SDK, taking in structured output from OpenAI)

- Vercel AI SDK with streaming text response
    - refer to Vercel AI SDK docs
- Vercel AI SDK with streaming generative UI
    - refer to Vercel AI SDK docs
- Open AI structured output
    - refer to Learn More section below
- PPR (with React Suspense)
    - refer to nextjs learn course below




- Tailwind -- already set up for you. You may additionally use shadcn/ui as a bonus
- UploadThing -- you will need to add UploadThing to host files. 
- Turso DB -- you will need to add Turso. SQLite is already set up for you
- Drizzle + RSC
    - create, read, update & delete posts
- Server Components + Server Actions
    - refer to the nextjs learn course below and the walkthrough video




## Learn More

We try to keep this project as simple as possible, so you can start with just the scaffolding T3 set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. 

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

Additionally, you may find the following resources helpful:

- [T3 Stack Walkthough by creator -- NextJS App Router, TS, Tailwind, Drizzle, Server Components, Server Actions, Vercel Deployment, UploadThing](https://www.youtube.com/watch?v=d5x0JCZbAJs)
- [UploadThing](https://uploadthing.com/)
- [Next.js Learn Course](https://nextjs.org/learn/dashboard-app)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs/introduction)
- [NextJS with Turso + Drizzle -- Video](https://www.youtube.com/watch?v=4ZhtoOFKFP8)
- [Open AI Structured Output Docs](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- [Vercel AI SDK + Structured Output -- Refer for Code + Version](https://github.com/vercel/ai/issues/2573)

## How do I deploy this?

Follow T3 Stack's deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel).