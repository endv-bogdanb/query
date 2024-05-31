import { faker } from "@faker-js/faker";
import { factory, oneOf, primaryKey } from "@mswjs/data";

function makeAutoIncrement() {
  let id = 0;

  return () => ++id;
}

export const db = factory({
  user: {
    __typename: () => "User",
    id: primaryKey(makeAutoIncrement()),
    username: String,
    password: String,
    profile: oneOf("profile"),
  },
  profile: {
    __typename: () => "Profile",
    id: primaryKey(makeAutoIncrement()),
    firstName: faker.person.firstName,
    lastName: faker.person.lastName,
    logo: () =>
      faker.image.urlLoremFlickr({
        category: "nature",
        height: 640,
        width: 480,
      }),
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
