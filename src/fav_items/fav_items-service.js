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
    return knex
      .insert(newItem)
      .into("fav_items")
      .returning("*")
      .then((rows) => {
        console.log(newTags);
        knex
          .insert(
            { fav_items_id: parseInt(rows[0].id) },
            { value: newRating.rating }
          )
          .into("ratings")
          .returning("*")
          .then((row) => {
            return row;
          });

        return rows[0];
      });
  },

  // insertRating(knex, newRating) {
  //   return knex
  //     .insert({ value: newRating.rating })
  //     .into("ratings")
  //     .returning("*")
  //     .then((row) => {
  //       console.log(row);
  //       return row;
  //     });
  // },

  //     knex
  //       .select("youtube_id")
  //       .from("fav_items")
  //       .where("youtube_id", newItem.youtube_id)
  //       .then((favVideoList) => {
  //         console.log(favVideoList);
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
