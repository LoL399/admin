exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE tops
    (
      id BIGINT NOT NULL PRIMARY KEY,
      name TEXT,
      year TEXT,
      data jsonb,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE tops
  `);
};
