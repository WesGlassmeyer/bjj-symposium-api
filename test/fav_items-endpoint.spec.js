const knex = require("knex");
const fixtures = require("./fav_items-fixtures");
const app = require("../src/app");

before("make knex instance", () => {
  db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
  });
  app.set("db", db);
});

after("disconnect from db", () => db.destroy());

before("clean the table", () =>
  db("fav_items_tags_pivot", "tags", "ratings", "fav_items").truncate()
);

afterEach("cleanup", () =>
  db("fav_items_tags_pivot", "tags", "ratings", "fav_items").truncate()
);

describe("GET /fav_items", () => {
  const testFavItems = fixtures.makeFavItemsArray();
  const testRatings = fixtures.makeRatingsArray();
  const testTags = fixtures.makeTagsArray();
  const testTagsPivot = fixtures.makeFavItemsTagsPivot();
  const testExpectedFavItems = fixtures.makeExpectedFavItemsArray();

  beforeEach("insert fav_items", () => {
    return db.into("fav_items").insert(testFavItems);
  });
  beforeEach("insert ratings", () => {
    return db.into("ratings").insert(testRatings);
  });
  beforeEach("insert tags", () => {
    return db.into("tags").insert(testTags);
  });
  beforeEach("insert tags pivot", () => {
    return db.into("fav_items_tags_pivot").insert(testTagsPivot);
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
