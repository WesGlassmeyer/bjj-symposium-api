const path = require("path");
const express = require("express");
const xss = require("xss");
const FavItemsService = require("./fav_items-service");

const favItemsRouter = express.Router();
const jsonParser = express.json();

const serializeItem = (item) => ({
  id: item.id,
  title: xss(item.title),
  rating: item.rating,
  tags: item.tags,
  youtube_id: item.youtube_id,
  thumbnail: item.thumbnail,
});

favItemsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FavItemsService.getAllItems(knexInstance)
      .then((items) => {
        const newItems = [];
        items.forEach((item) => {
          if (
            !newItems.find((video) => {
              return video.youtube_id === item.youtube_id;
            })
          ) {
            let tags = [];
            items.forEach((video) => {
              if (
                !tags.includes(video.name) &&
                video.youtube_id === item.youtube_id
              ) {
                tags.push(video.name);
              }
            });
            item.tags = tags;
            newItems.push(item);
          }
          let ratings = [];
          items.forEach((vid) => {
            if (vid.youtube_id === item.youtube_id) {
              ratings.push(parseInt(vid.value));
            }
          });
          function average(ratings) {
            return ratings.reduce((a, b) => a + b) / ratings.length;
          }
          item.rating = Math.round(average(ratings));
        });
        res.json(newItems.map(serializeItem));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, youtube_id, thumbnail } = req.body;
    const newItem = { title, youtube_id, thumbnail };
    const { rating } = req.body;
    const newRating = { rating };
    const { tags } = req.body;
    const newTags = tags;

    for (const [key, value] of Object.entries(newItem, newRating))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    //newItem.name = name;
    return FavItemsService.insertItem(
      req.app.get("db"),
      newItem,
      newRating,
      newTags
    )
      .then((item) => {
        console.log(item, "====================");
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(serializeItem(item));
      })
      .catch(next);
  });

favItemsRouter
  .route("/:itemid")
  .all((req, res, next) => {
    FavItemsService.getById(req.app.get("db"), req.params.itemid)
      .then((item) => {
        if (!item) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeItem(res.item));
  });

module.exports = favItemsRouter;
