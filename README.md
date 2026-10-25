# TechWithMiclem

Portfolio + engineering journal built with **React 18**, **Vite** and **Supabase**.

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run, in order:
   - `supabase/schema.sql` — tables, the `category_counts` view and row level security
   - `supabase/seed.sql` — the sample posts, projects, skills and roadmap from the design
3. Go to **Project Settings → API** and copy the **Project URL** and **anon public key**.

## 2. Run locally

```bash
npm install
cp .env.example .env     # then paste your URL and anon key
npm run dev
```

## 3. Managing content

All content lives in Supabase — edit rows in the **Table Editor** and the site updates on refresh.

| Table | Drives |
|---|---|
| `posts` (+ `categories`, `topics`) | Journal list, post pages, sidebar |
| `focus_items`, `skills`, `tech_proof`, `roadmap` | Home page sections |
| `projects` (`featured = true`) | Home "Featured projects" |
| `subscribers`, `messages` | Newsletter and contact form submissions (only you can read them) |

To publish a post, insert a row with `published = true`. Set `cover_url` to any image URL
(or upload to a Supabase Storage public bucket and paste the link). Post `content` is plain text; blank lines split paragraphs.

Security: visitors (anon key) can only read published content and insert into `subscribers`/`messages`.
Writes to everything else require a signed-in user — create yourself one under **Authentication → Users**.

## 4. Deploy

`npm run build` outputs `dist/`. On Vercel/Netlify set the two `VITE_SUPABASE_*` env vars and add an
SPA rewrite so all routes serve `index.html` (Vercel: `vercel.json` with a rewrite to `/index.html`; Netlify: `_redirects` containing `/* /index.html 200`).

## To customise

- Social links: `src/components/Footer.jsx` (`SOCIALS`)
- Colours and spacing: CSS variables at the top of `src/styles.css`
- The Engineer / Lab / Under the Hood / Talks / Now pages are placeholders in `src/App.jsx`, ready to be built out.
