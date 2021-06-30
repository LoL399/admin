const knex = require("../knex");

const insert = async (params) => {
  console.log(`adding product`)
  await knex("flims").insert(params);
  const [row] = await knex.select(knex.raw('last_insert_rowid() as id'));
  return row.id
};

const getByParams = async (params) => {
  const result = await knex("flims").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("flims").update(params).where({ id });
};

const getAllByOffset = async (offset,filter) =>
  await knex("flims").select().where({type:filter}).orderBy('id','desc').limit(20).offset(offset);

const find = async (filter) =>
  await knex("flims").select().where("info", 'like',`%${filter}%`);

  module.exports = {
    insert,
    getByParams,
    getAllByOffset,
    update,
    find
  };
  