#!/bin/bash

cat data.json \
| jq -r '.data[]|[.id, .title, .url, .description, "{\(.tags // [] | join(","))}", .dateAdded, .lastVisited, .viewCount, .isPinned, .isArchived, .imgUrl, .toDelete] | @tsv ' \
| psql18 -U postgres -h localhost -p 5432 -d bookmark_manager \
-c "COPY bookmarks(id ,title, url, description, tags, date_added, last_visited, view_count, is_pinned, is_archived, img_url, to_delete) FROM STDIN with (format text)"