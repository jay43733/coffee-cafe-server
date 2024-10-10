require("dotenv").config();
const prisma = require("../config/prisma");

async function run() {
  try {
    await prisma.$executeRawUnsafe("DROP DATABASE coffee-cafe");
    await prisma.$executeRawUnsafe("CREATE DATABASE coffee-cafe");
  } catch (err) {
    console.log(err);
  }
}

console.log("Reset DB...");
run();
