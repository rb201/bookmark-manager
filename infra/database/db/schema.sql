DROP TABLE IF EXISTS bookmarks;

CREATE TABLE IF NOT EXISTS bookmarks (
  id text PRIMARY KEY,
  title text NOT NULL,
  url text NOT NULL,
  description text,
  tags text[],
  date_added timestamptz,
  last_visited timestamptz,
  view_count integer,
  is_pinned boolean NOT NULL,
  is_archived boolean NOT NULL,
  img_url text,
  to_delete boolean
);
