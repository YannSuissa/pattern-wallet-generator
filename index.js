const gen_private = require('./gen_private')

function gen_keys(pattern, with_seed, debug) {
  return (gen_private(pattern, with_seed, debug))
}

module.exports = gen_keys