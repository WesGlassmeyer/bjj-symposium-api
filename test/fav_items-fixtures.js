function makeFavItemsArray() {
  return [
    {
      title:
        "The 3 Most Important Jiu Jitsu Techniques For A BJJ White Belt by John Danaher",
      youtube_id: "QBqwipFt0Ww",
      thumbnail: "https://i.ytimg.com/vi/QBqwipFt0Ww/default.jpg",
    },
    {
      title: "5 Tips To Pass ANY Guard by John Danaher",
      youtube_id: "ODuQCA88oY4",
      thumbnail: "https://i.ytimg.com/vi/ODuQCA88oY4/default.jpg",
    },
    {
      title: "BJJ Moves: Arm Bar From Guard by John Danaher",
      youtube_id: "pQ43Oy5k9yQ",
      thumbnail: "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg",
    },
  ];
}

function makeExpectedFavItemsArray() {
  return [
    {
      id: 1,
      title:
        "The 3 Most Important Jiu Jitsu Techniques For A BJJ White Belt by John Danaher",
      rating: 1,
      youtube_id: "QBqwipFt0Ww",
      tags: ["Mount", "Attack", "Side Control"],
      thumbnail: "https://i.ytimg.com/vi/QBqwipFt0Ww/default.jpg",
    },
    {
      id: 2,
      title: "5 Tips To Pass ANY Guard by John Danaher",
      rating: 2,
      youtube_id: "ODuQCA88oY4",
      tags: ["Back Mount", "Guard", "Reversal"],
      thumbnail: "https://i.ytimg.com/vi/ODuQCA88oY4/default.jpg",
    },
    {
      id: 3,
      title: "BJJ Moves: Arm Bar From Guard by John Danaher",
      rating: 4,
      youtube_id: "pQ43Oy5k9yQ",
      tags: ["Choke", "Kimura", "Leg Locks"],
      thumbnail: "https://i.ytimg.com/vi/pQ43Oy5k9yQ/default.jpg",
    },
  ];
}

function makeRatingsArray() {
  return [
    {
      value: "1",
      fav_items_id: 1,
    },
    {
      value: "2",
      fav_items_id: 2,
    },
    {
      value: "3",
      fav_items_id: 3,
    },
    {
      value: "4",
      fav_items_id: 3,
    },
  ];
}

function makeTagsArray() {
  return [
    {
      name: "Mount",
      category: "Position",
    },
    {
      name: "Back Mount",
      category: "Position",
    },
    {
      name: "Side Control",
      category: "Position",
    },
    {
      name: "Guard",
      category: "Position",
    },
    {
      name: "Choke",
      category: "Submissions",
    },
    {
      name: "Arm bar",
      category: "Submissions",
    },
    {
      name: "Kimura",
      category: "Submissions",
    },
    {
      name: "Triangle",
      category: "Submissions",
    },
    {
      name: "Leg Locks",
      category: "Submissions",
    },
    {
      name: "Escape",
      category: "Actions",
    },
    {
      name: "Reversal",
      category: "Actions",
    },
    {
      name: "Control",
      category: "Actions",
    },
    {
      name: "Attack",
      category: "Actions",
    },
  ];
}

function makeFavItemsTagsPivot() {
  return [
    {
      fav_items_id: 1,
      tag_id: 1,
    },
    {
      fav_items_id: 1,
      tag_id: 13,
    },
    {
      fav_items_id: 1,
      tag_id: 3,
    },
    {
      fav_items_id: 2,
      tag_id: 2,
    },
    {
      fav_items_id: 2,
      tag_id: 4,
    },
    {
      fav_items_id: 2,
      tag_id: 11,
    },
    {
      fav_items_id: 3,
      tag_id: 5,
    },
    {
      fav_items_id: 3,
      tag_id: 7,
    },
    {
      fav_items_id: 3,
      tag_id: 9,
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
  makeExpectedFavItemsArray,
  makeRatingsArray,
  makeTagsArray,
  makeFavItemsTagsPivot,
  makeMaliciousItem,
};
