# newsfeed

## Getting started with the repo

1. Clone it: `git clone git@github.com:on-deck/coding-challenge-newsfeed.git`
2. Open the folder: `cd coding-challenge-newsfeed`
3. Install the dependencies: `yarn install`
4. Run the dev server: `yarn dev`
5. Open http://localhost:3000

## Project structure

Tech stack:

- Next.js,
- TypeScript,
- Sqlite3,
- Apollo server,
- Apollo client,
- React.

Folder structure:

- `components/` — reusable React components;
- `pages/` — the usual Next.js [page structure](https://nextjs.org/docs/basic-features/pages);
- `graphql/` — GraphQL server, schema, resolvers, DB connection;
- `scripts/` — contains the SQL script used for creating and populating the tables in `db.sqlite`.

The database is already included in the repo (`db.sqlite`) and populated (`scripts/populate.sql`). Its basic structure:

- `users` — people participating in fellowships;
- `projects` — projects that founders are working on (connected to `users` through `user_projects`);
- `announcements` — announcements by On Deck Team targeting specific fellowships or global (`fellowship = "all"`).

### Further Improvements

- Models are scattered across the codebase, ideally should be in a single folder
