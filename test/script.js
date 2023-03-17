 
const wallet_gen = require('pattern-wallet-generator')

const with_seed = true
const without_seed = false

let wallet;

// console.log(helloNpm())
wallet = wallet_gen("0x4242", with_seed)
console.log("return value", wallet)
wallet = wallet_gen("0x424242", without_seed)
console.log("return value", wallet)
