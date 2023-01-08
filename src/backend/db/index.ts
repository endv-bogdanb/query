import { factory, primaryKey, oneOf } from "@mswjs/data";
import { faker } from "@faker-js/faker";

function makeAutoIncrement() {
  let id = 0;

  return () => ++id;
}

export const db = factory({
  user: {
    id: primaryKey(makeAutoIncrement()),
    username: String,
    password: String,
    profile: oneOf("profile"),
  },
  profile: {
    id: primaryKey(makeAutoIncrement()),
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    logo: faker.image.cats,
  },
});

if (db.user.count() === 0) {
  db.user.create({
    username: "admin",
    password: "admin",
    profile: db.profile.create(),
  });

  db.user.create({
    username: "test",
    password: "test",
    profile: db.profile.create(),
  });
}