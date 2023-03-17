const gen_private = require('./gen_private')

function gen_keys(pattern, with_seed) {
  return (gen_private(pattern, with_seed))
}

module.exports = gen_keys