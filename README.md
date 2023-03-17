# chatgpt

very functional chatgpt clone, all conversations are stored locally.

## tech
- nextjs
- typescript
- tailwindcss

## running locally

1. clone

    ```bash
    git clone https://github.com/umarhadi/chatgpt.git
    ```

2. install dependencies

    ```bash
    pnpm install
    ```

3. provide OpenAI API key

    create a ``.env.local`` file in the root of the repo with your OpenAI API Key:

    ```bash
    OPENAI_API_KEY=<YOUR_KEY>
    ```

4. run dev server

    ```bash
    pnpm dev
    ```

## deploy

one click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fumarhadi%2Fchatgpt&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20Key.%20Chat%20will%20not%20work%20if%20you%20don't%20provide%20it.)