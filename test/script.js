 
const wallet_gen = require('pattern-wallet-generator')

const with_seed = true
const without_seed = false
const debug = true

let wallet = wallet_gen(["0x42000000","0x00420000","0x00004200","0x00000042"], without_seed, debug)
console.log("return value", wallet)
