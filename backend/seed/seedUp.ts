import { faker } from "@faker-js/faker";
import { $Enums, Restroom } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { genSnowflake } from "../src/util/snowflake";
import crypto from "crypto";
import { prisma } from "../src";

const cities = [
  {
    name: "Turku",
    lat: 60.45451,
    lng: 22.264824,
  },
];

/**
* Generates number of random geolocation points given a center and a radius.

(Magic math found from the internet)
*/
function randomLocation(lat: number, lng: number, radius: number) {
    var x0 = lng;
    var y0 = lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;
  
    var u = Math.random();
    var v = Math.random();
  
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
  
    var xp = x/Math.cos(y0);
  
    // Resulting point.
    return [y+y0, xp+x0];
  }


async function generateRestrooms(authorId: bigint) {
  const result: Restroom[] = [];

  for (const city of cities) {
    for (let i = 0; i < 150; i++) {
      const name = faker.location.streetAddress();
      console.log(`"${name}" generated.`);
      const [lat, lng] = randomLocation(city.lat, city.lng, 10_000);

      result.push({
        id: genSnowflake(),
        name,
        sex: Math.random() > 0.5 ? $Enums.Sex.MEN : $Enums.Sex.WOMEN,
        fee: new Decimal(Math.random() * 5),
        accessible: Math.random() > 0.7 ? true : false,
        code: Math.floor(Math.random() * 4).toString(),
        notes: faker.commerce.productDescription(),

        lat: new Decimal(lat),
        lng: new Decimal(lng),

        authorId,
      });
    }
  }

  await prisma.restroom.createMany({
    data: result
  });

  console.log("Done!");
}

async function createAdmin() {
  const userId = genSnowflake();

  console.log("Creating ADMIN user...");
  await prisma.user.create({
    data: {
      id: userId,
      username: "ADMIN",
      email: "admin@restroomtracker.com",
      services: {
        create: {
          // This is not functional just used to fill the db
          refreshToken: crypto.randomBytes(20).toString('hex'),
          service: "DISCORD",
        }
      }
    }
  });

  return userId;
}

async function seedUp() {
  const adminId = await createAdmin();

  await generateRestrooms(adminId);
}

seedUp();
