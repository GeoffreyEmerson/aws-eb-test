DROP DATABASE IF EXISTS items;
CREATE DATABASE items;

\connect items;

CREATE TABLE items (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  media VARCHAR,
  release_date VARCHAR
);

INSERT INTO items (name, media, release_date)
  VALUES ('Star Wars', 'LaserDisk', '1977');
