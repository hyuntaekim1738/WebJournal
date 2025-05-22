This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies/Setup
CD into the web-journal directory before running these commands.
- Requires node 18.18.0, 19.8.0, or >= 20.0.0. CD: nvm install node 
- npm install mongodb
- npm install next-auth@beta @auth/mongodb-adapter bcryptjs
- create .env.local file
    - add this line: MONGODB_URI="your_mongo_db_connection_string"
    - GOOGLE_ID=your_google_client_id
    - GOOGLE_SECRET=your_google_client_secret
    - NEXTAUTH_URL=http://localhost:3000
    - NEXTAUTH_SECRET= (run openssl rand -base64 32 and copy paste output here)
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


