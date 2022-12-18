import { factory, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    name: String,
    username: String,
    password: String,
  },
});

if (db.user.count() === 0) {
  db.user.create({
    name: "admin",
    username: "admin",
    password: "admin",
  });
}
