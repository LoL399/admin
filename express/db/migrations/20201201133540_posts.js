exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE posts 
    (
      id BIGINT NOT NULL PRIMARY KEY,
      type TEXT DEFAULT 'review',
      uid BIGINT NOT NULL,
      title TEXT,
      content TEXT,
      data jsonb,
      crawl_data jsonb,
      tags TEXT[],
      interacts jsonb[],
      slug TEXT,
      status BOOL DEFAULT TRUE,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
  `);
};

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE posts
  `);
};
