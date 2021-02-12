const FavItemsService = {
  getAllItems(knex) {
    return knex
      .select("*")
      .from("fav_items")
      .join("ratings", "fav_items.id", "=", "ratings.fav_items_id");
  },

  //   knex('users')
  //   .join('contacts', 'users.id', '=', 'contacts.user_id')
  //   .select('users.id', 'contacts.phone')

  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("fav_items")
      .returning("*")
      .then((rows) => {
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
