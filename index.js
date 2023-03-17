const gen_private = require('./gen_private')

const with_seed = true
const without_seed = false

function gen_keys() {
  let wallet;

  wallet = gen_private("0x4242", with_seed)
  console.log("return value", wallet)
  wallet = gen_private("0x424242", without_seed)
  console.log("return value", wallet)
}

module.exports = gen_keys