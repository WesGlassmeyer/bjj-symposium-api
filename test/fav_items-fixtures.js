function makeFavItemsArray() {
  return [
    {
      id: 1,
      title:
        "The 3 Most Important Jiu Jitsu Techniques For A BJJ White Belt by John Danaher",
      youtube_id: "QBqwipFt0Ww",
      thumbnail: "https://i.ytimg.com/vi/QBqwipFt0Ww/default.jpg",
      rating: 1,
      tags: ["Mount", "Back Mount", "Side Control"],
    },
    {
      id: 2,
      title: "5 Tips To Pass ANY Guard by John Danaher",
      youtube_id: "ODuQCA88oY4",
      thumbnail: "https://i.ytimg.com/vi/ODuQCA88oY4/default.jpg",
      rating: 2,
      tags: ["Guard", "Choke", "Arm Bar"],
    },
    {
      id: 3,
      title: "BJJ Moves: Arm Bar From Guard by John Danaher",
      youtube_id: "pQ43Oy5k9yQ",
      thumbnail: "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg",
      rating: 3,
      tags: ["Kimura", "Triangle", "Leg Locks"],
    },
  ];
}

function makeMaliciousItem() {
  const maliciousItem = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    youtube_id: "r1ANd0mJ2n7",
    thumbnail: "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg",
    rating: 3,
    tags: ["Kimura", "Triangle", "Leg Locks"],
  };
  const expectedItem = {
    ...maliciousItem,
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    youtube_id: "r1ANd0mJ2n7",
    thumbnail: "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg",
    rating: 3,
    tags: ["Kimura", "Triangle", "Leg Locks"],
  };
  return {
    maliciousItem,
    expectedItem,
  };
}

module.exports = {
  makeFavItemsArray,
  makeMaliciousItem,
};
