INSERT INTO fav_items ( title, youtube_id, thumbnail, created_ts)
VALUES
( "The 3 Most Important Jiu Jitsu Techniques For A BJJ White Belt by John Danaher", "QBqwipFt0Ww", "https://i.ytimg.com/vi/QBqwipFt0Ww/default.jpg", '2019-01-03T00:00:00.000Z'),
( "5 Tips To Pass ANY Guard by John Danaher", "ODuQCA88oY4", "https://i.ytimg.com/vi/ODuQCA88oY4/default.jpg",  '2019-02-03T00:00:00.000Z'),
( "BJJ Moves: Arm Bar From Guard by John Danaher", "pQ43Oy5k9yQ", "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg", '2019-03-04T00:00:00.000Z');

INSERT INTO ratings (value, fav_items_id)
(1, 1), 
(2, 2),
(3, 3);

INSERT INTO tags (name, category)
("Mount", "Positions"), 
("Back Mount", "Positions"),
("Side Control", "Positions"),
("Guard", "Positions"),
("Choke", "Submissions"),
("Arm Bar", "Submissions"),
("Kimura", "Submissions"),
("Triangle", "Submissions"),
("Leg Locks", "Submissions"),
("Escape", "Actions"),
("Reversal", "Actions"),
("Control", "Actions"),
("Attack", "Actions");

INSERT INTO fav_items_tags_pivot (fav_items_id, tag_id)
(1, 1), 
(1, 3),
(1, 13)
(2, 2), 
(2, 4),
(2, 11)
(3, 5), 
(3, 7),
(3, 9);

