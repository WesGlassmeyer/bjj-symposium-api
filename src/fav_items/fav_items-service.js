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

  insertItem(knex, newItem, newRating) {
    return knex
      .insert(newItem)
      .into("fav_items")
      .returning("*")
      .then((rows) => {
        console.log(newRating.rating);
        return knex
          .insert([{ fav_items_id: rows[0].id }, { value: newRating.rating }])
          .into("ratings")
          .returning("*")
          .then((row) => {
            console.log(newRating.rating);
            return row;
          });

        return rows[0];
      });
  },

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
