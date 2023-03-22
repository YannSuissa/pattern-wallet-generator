const ethers = require('ethers');  
// const crypto = require('crypto');

const { publicKeyConvert, publicKeyCreate } = require('secp256k1')
const keccak256 = require('js-sha3').keccak256;

let last_sec = 0
let cpt = 0
let time_start

let p_pattern, p_with_seed, p_debug, p_odds = 0;
const refresh_unit = 50000

function format_time(t) {
  if (t < 60) return (t.toFixed(1) + " seconds")
  t /= 60;
  if (t < 60) return (t.toFixed(1) + " minutes")
  t /= 60;
  if (t < 24) return (t.toFixed(1) + " hours")
  t /= 24;  
  if (t < 365) return (t.toFixed(1) + " days")
  t /= 365;
  return (t.toFixed(0) + " years")
}

function print(pid, last) {

  curr = performance.now();
  let sec = Number((curr - time_start) / 1000)
  if (!last_sec) last_sec = sec
  if (sec - last_sec < 2) return

  last_sec = sec
  let per_sec = Number((cpt / sec).toFixed(0))

  console.log('[' + pid + '] Tries', cpt, '- Speed', per_sec, '/s - ', 
    "Elapsed", format_time(sec), "-",
    "estimated", format_time(p_odds / per_sec)) 
}

function private_to_addr(privateKey) {
  let priv, pub1, pub2, hash, ret;
  priv = Buffer.from(privateKey, 'hex')
  pub1 = Buffer.from(publicKeyCreate(priv, false))
  pub2 = Buffer.from(publicKeyConvert(pub1, false)).slice(1)

  hash = keccak256(pub2)
  ret = "0x" + hash.slice(-40)
  priv = pub1 = pub2 = hash = null
  return ret
}

// 2x faster than crypto.randomBytes(32).toString('hex');
const hex = "0123456789abcdef"

async function find_addr(pid) {

  let privateKey, wallet = {}
  let refresh = (p_with_seed) ? refresh_unit / 10 : refresh_unit;

  time_start = performance.now()

  while (1) {
    cpt++
    if (p_with_seed) {
      wallet = ethers.Wallet.createRandom()
    } 
    else {
      // privateKey = "0x" + crypto.randomBytes(32).toString('hex'); //slower
      privateKey = "";
      for (let i = 0; i < 64; ++i) {
        privateKey += hex.charAt(Math.floor(Math.random() * 16))
      }

      // wallet = new ethers.Wallet("0x" + privateKey);              //slower
  
      wallet.address = private_to_addr(privateKey)
    }

    if (p_debug && !(--refresh)) {
      print(pid)
      refresh = (p_with_seed) ? refresh_unit / 10 : refresh_unit;
    }

    for (let i = 0; i < p_pattern.length; i++) {
      if (wallet.address.startsWith(p_pattern[i])) {
        wallet.privateKey = "0x" + privateKey
        print(pid, true)
        return wallet
      }
    }
    wallet.address = null
  }
}

function gen_private(pattern, with_seed, debug) {

  p_pattern = pattern
  p_with_seed = with_seed
  p_debug = debug
  for (let i = 0; i < p_pattern.length; i++) {
    if (16 ** pattern[i].replace("0x", "").length > p_odds)
      p_odds += 16 ** pattern[i].replace("0x", "").length
  }
  p_odds /= p_pattern.length

  if (debug)
    console.log('Starting challenge for', pattern, (with_seed) ? "With seed..." : "Without seed...",
    "odds are : 1 / ", p_odds)
  
  let obj = {}
  obj = find_addr(0)
  
  return obj
}

module.exports = gen_private