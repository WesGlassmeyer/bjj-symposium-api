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
});

favItemsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FavItemsService.getAllItems(knexInstance)
      .then((items) => {
        console.log(items);
        res.json(items.map(serializeItem));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const newItem = { name };

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    //newItem.name = name;
    FavItemsService.insertItem(req.app.get("db"), newItem)
      .then((item) => {
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
  })
  .delete((req, res, next) => {
    FavItemsService.deleteItem(req.app.get("db"), req.params.itemid)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { name } = req.body;
    const itemToUpdate = { name };

    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain a item name`,
        },
      });

    FavItemsService.updateItem(
      req.app.get("db"),
      req.params.itemid,
      itemToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = favItemsRouter;
