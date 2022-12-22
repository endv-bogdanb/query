import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

function makeAutoIncrement() {
  let id = 0;

  return () => ++id;
}

export const db = factory({
  user: {
    id: primaryKey(makeAutoIncrement()),
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    username: String,
    password: String,
  },
});

if (db.user.count() === 0) {
  db.user.create({
    username: "admin",
    password: "admin",
  });

  db.user.create({
    username: "test",
    password: "test",
  });
}
