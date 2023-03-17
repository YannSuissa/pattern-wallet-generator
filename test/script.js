 
const wallet_gen = require('pattern-wallet-generator')

const with_seed = true
const without_seed = false
const debug = true

let wallet;

wallet = wallet_gen("0x4242", with_seed, debug)
console.log("return value", wallet)
wallet = wallet_gen("0x424242", without_seed, debug)
console.log("return value", wallet)
