const knex = require("knex");
const fixtures = require("./fav_items-fixtures");
const app = require("../src/app");

before("make knex instance", () => {
  db = knex({
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  });
  app.set("db", db);
});

after("disconnect from db", () => db.destroy());

before("clean the table", () =>
  db.raw(
    "TRUNCATE fav_items_tags_pivot, tags, ratings, fav_items RESTART IDENTITY CASCADE"
  )
);

afterEach("clean the table", () =>
  db.raw(
    "TRUNCATE fav_items_tags_pivot, tags, ratings, fav_items RESTART IDENTITY CASCADE"
  )
);

describe("GET /fav_items", () => {
  const testFavItems = fixtures.makeFavItemsArray();
  const testRatings = fixtures.makeRatingsArray();
  const testTags = fixtures.makeTagsArray();
  const testTagsPivot = fixtures.makeFavItemsTagsPivot();
  const testExpectedFavItems = fixtures.makeExpectedFavItemsArray();

  beforeEach("insert fav_items", () => {
    return db
      .into("fav_items")
      .insert(testFavItems)
      .then(() => {
        return db.into("ratings").insert(testRatings);
      })
      .then(() => {
        return db.into("tags").insert(testTags);
      })
      .then(() => {
        return db.into("fav_items_tags_pivot").insert(testTagsPivot);
      });
  });

  it("gets the fav_items from the database", () => {
    return (
      supertest(app)
        .get("/fav_items")
        //   .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .expect(200, testExpectedFavItems)
    );
  });
});

describe(`POST /fav_items`, () => {
  it(`creates a fav_item, responding with 201 and the new fav_item`, function () {
    const newFavTags = {
      tag_id: [2, 4, 11],
      fav_items_id: 1,
    };
    const newFavRating = {
      value: 2,
      fav_items_id: 1,
    };
    const newFavItem = {
      title: "5 Tips To Pass ANY Guard by John Danaher",
      rating: 2,
      youtube_id: "ODuQCA88oY4",
      tags: ["Back Mount", "Guard", "Reversal"],
      thumbnail: "https://i.ytimg.com/vi/ODuQCA88oY4/default.jpg",
    };
    return (
      supertest(app)
        .post("/fav_items")
        //   .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(newFavItem, newFavRating, newFavTags)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).to.eql(newFavItem.title);
          expect(res.body.rating).to.eql(newFavRating.rating);
          expect(res.body.youtube_id).to.eql(newFavItem.youtube_id);
          expect(res.body.thumbnail).to.eql(newFavItem.thumbnail);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(
            `/fav_items/${res.body.youtube_id}`
          );
        })
        .then((res) =>
          supertest(app)
            .get(`/fav_items/${res.body.youtube_id}`)
            // .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(res.body)
        )
    );
  });
});
