const knex = require("../knex");

const insert = async (params) => {
  console.log(`adding ${params.name}`)
  await knex("users").insert(params);
  const [row] = await knex.select(knex.raw('last_insert_rowid() as id'));
  return row.id
};

const getByParams = async (params) => {
  const result = await knex("users").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("users").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("users").select().limit(20).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
