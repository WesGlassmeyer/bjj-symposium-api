
CREATE TABLE fav_items (
    
 id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY UNIQUE,
    title TEXT NOT NULL,
    youtube_id TEXT NOT NULL, 
    thumbnail TEXT NOT NULL,
    updated_ts TIMESTAMPTZ  DEFAULT now() NOT NULL,
    created_ts TIMESTAMPTZ DEFAULT now() NOT NULL);