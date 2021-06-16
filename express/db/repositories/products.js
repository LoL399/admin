const knex = require("../knex");

const insert = async (params) => {
  console.log(`adding product`)
  await knex("productions").insert(params);
  const [row] = await knex.select(knex.raw('last_insert_rowid() as id'));
  return row.id
};

const getByParams = async (params) => {
  const result = await knex("productions").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("productions").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("productions").select().orderBy('id','desc').limit(10).offset(offset);

const find = async (filter) =>
  await knex("productions").select().where("info", 'like',`%${filter}%`);

  module.exports = {
    insert,
    getByParams,
    getAllByOffset,
    update,
    find
  };
  