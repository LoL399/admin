exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE flims 
    (
      id BIGINT NOT NULL PRIMARY KEY,
      type TEXT DEFAULT 'movie',
      info jsonb,
      what_to_knows TEXT,
      streamings TEXT[],
      photos TEXT,
      crews TEXT,
      quotes TEXT,
      data jsonb,
      lemon_score INT DEFAULT 0,
      user_score INT DEFAULT 0,
      status BOOL DEFAULT TRUE,
      slug TEXT,
      crawl_data jsonb,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
    `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE flims
    `);
};
