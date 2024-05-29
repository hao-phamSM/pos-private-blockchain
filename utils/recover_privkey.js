const fs = require("fs");
const keythereum = require("keythereum"); // npm i keythereum
var args = process.argv.slice(2);
const KEYSTORE = args[0];
const PASSWORD = "123";

const keyObject = JSON.parse(fs.readFileSync(KEYSTORE, {encoding: "utf8"}));
const privateKey = keythereum.recover(PASSWORD, keyObject).toString("hex");
console.log(`0x${keyObject.address}: 0x${privateKey}`);