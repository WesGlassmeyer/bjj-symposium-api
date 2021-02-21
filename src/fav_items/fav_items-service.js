const FavItemsService = {
  getAllItems(knex) {
    return knex
      .select("*")
      .from("fav_items")
      .join("ratings", "fav_items.id", "=", "ratings.fav_items_id")
      .join(
        "fav_items_tags_pivot",
        "fav_items.id",
        "=",
        "fav_items_tags_pivot.fav_items_id"
      )
      .join("tags", "fav_items_tags_pivot.tag_id", "=", "tags.id");
  },

  insertItem(knex, newItem, newRating, newTags) {
    let favItem;
    return knex
      .select("*")
      .from("fav_items")
      .where("youtube_id", newItem.youtube_id)
      .then((favVideo) => {
        if (favVideo.length === 0) {
          return knex.insert(newItem).into("fav_items").returning("*");
        } else {
          return favVideo;
        }
      })
      .then((newFavItem) => {
        favItem = newFavItem[0];
        return knex
          .insert({ fav_items_id: newFavItem[0].id, value: newRating.rating })
          .into("ratings")
          .returning("*");
      })
      .then((newRatingRows) => {
        console.log(newRatingRows, "aaaaaaaaaaaaaaaaaaa");
        return knex.select("id").from("tags").whereIn("name", newTags);
        // knex.insert(newTags).into("fav_items_tags_pivot")
      })
      .then((parsedTags) => {
        console.log(parsedTags, "bbbbbbbbbbbbbbb");
        for (i = 0; i < parsedTags.length; i++) {
          return knex
            .insert({ tag_id: parsedTags[i].id, fav_items_id: favItem.id })
            .into("fav_items_tags_pivot");
        }
      });
  },

  // return (
  //   knex
  //     .select("*")
  //     .from("fav_items_tags_pivot")
  //     // .whereIn("tag_id", parsedTags.id)
  //     .whereNot("fav_items_id", favItem.id)
  //     .then((matchedTags) => {
  //       console.log(matchedTags, "ccccccccccccccccccc");
  //       return matchedTags;
  //     })
  // );

  //{
  //   return knex
  //     .insert(newItem)
  //     .into("fav_items")
  //     .returning("*")
  //     .then((rows) => {
  //       console.log(newTags);
  //       knex
  //         .insert({ fav_items_id: rows[0].id, value: newRating.rating })
  //         .into("ratings")
  //         .returning("*")
  //         .then((row) => {
  //           return row;
  //         });

  //       return rows[0];
  //     });
  // },

  //
  //       .then((favVideoList) => {
  //         consol knex
  //       .select("youtube_id")
  //       .from("fav_items")
  //       .where("youtube_id", newItem.youtube_id)e.log(favVideoList);
  //         if (favVideoList.length === 0) {
  //           return knex
  //             .insert(newItem)
  //             .into("fav_items")
  //             .returning("*")
  //             .then((rows) => {
  //               console.log(newTags);
  //               knex
  //                 .insert(
  //                   { value: newRating.rating },
  //                   { fav_items_id: rows[0].id }
  //                 )
  //                 .into("ratings")
  //                 .returning("*")
  //                 .then((row) => {
  //                   return row;
  //                 });
  //               console.log("inserted video --------------------------");
  //               return rows[0];
  //             });
  //         }
  //         console.log("_____________________video not inserted");
  //       });
  //   },

  getById(knex, id) {
    return knex.from("fav_items").select("*").where("id", id).first();
  },
  deleteItem(knex, id) {
    return knex("fav_items").where({ id }).delete();
  },
  updateItem(knex, id, newItemFields) {
    return knex("fav_items").where({ id }).update(newItemFields);
  },
};

module.exports = FavItemsService;
