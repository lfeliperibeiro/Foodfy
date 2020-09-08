CREATE DATABASE FOODFY;

CREATE TABLE recipes(
  ID SERIAL PRIMARY KEY,
  CHEF_ID INT NULL,
  IMAGE TEXT NULL,
  TITLE TEXT NOT NULL,
  INGREDIENTS TEXT[] NULL,
  PREPARATION TEXT[] NULL,
  INFORMATION TEXT NULL,
  CREATED_AT TIMESTAMP NOT NULL
);

CREATE TABLE CHEFS(
  ID SERIAL PRIMARY KEY,
  NAME TEXT NOT NULL,
  AVATAR_URL TEXT NULL,
  CREATED_AT TIMESTAMP NOT NULL 
);