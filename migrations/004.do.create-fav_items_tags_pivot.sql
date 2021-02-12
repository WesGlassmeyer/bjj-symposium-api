CREATE TABLE fav_items_tags_pivot (
    
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fav_items_id INTEGER REFERENCES fav_items(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
  
);
