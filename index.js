const ethers = require('ethers');  
// const crypto = require('crypto');

const { publicKeyConvert, publicKeyCreate } = require('secp256k1')
const createKeccakHash = require('keccak')
const { toChecksumAddress } = require('ethereum-checksum-address')


let last_sec
let cpt = 0
let time_start

let p_pattern, p_with_seed, p_debug, p_odds;
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
  let per_sec = Number((cpt / sec).toFixed(0))

  console.log('[' + pid + '] Tries', cpt, '- Speed', per_sec, '/s - ', 
    "Elapsed", format_time(sec), "-",
    "estimated", format_time(p_odds / per_sec)) 
}

// 2x faster than crypto.randomBytes(32).toString('hex');
const hex = "0123456789abcdef"

async function find_addr(pid) {

  let privateKey, wallet = {}
  let refresh = (p_with_seed) ? refresh_unit / 10 : refresh_unit;
  let priv, pub;

  wallet.address = "0x"

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
      
      // wallet = new ethers.Wallet(privateKey);                    //slower

      priv = Buffer.from(privateKey, 'hex')
      pub = Buffer.from(publicKeyCreate(priv, false))
      // pub = Buffer.from(pub, 'hex')
      
      pub = Buffer.from(publicKeyConvert(pub, false)).slice(1)
      const hash = createKeccakHash('keccak256').update(pub).digest()
      wallet.address = toChecksumAddress(hash.slice(-20).toString('hex'))
      // wallet.address = private_to_addr(privateKey)

      // console.log("privateKey", privateKey, wallet.address)
    }

    if (p_debug && !(--refresh)) {
      // console.log('refresh', refresh)
      print(pid)
      refresh = (p_with_seed) ? refresh_unit / 10 : refresh_unit;
    }

    if (!wallet.address.startsWith(p_pattern)) 
      continue
    else {
      wallet.publicKey = "0x" + privateKey
      print(pid, true)
      return wallet
    }
  }
}

function gen_private(pattern, with_seed, debug) {

  p_pattern = pattern
  p_with_seed = with_seed
  p_debug = debug
  p_odds = 16 ** pattern.replace("0x", "").length

  if (debug)
    console.log('Starting challenge for', pattern, (with_seed) ? "With seed..." : "Without seed...",
    "odds are : 1 / ", p_odds)
  
  let obj = {}
  obj = find_addr(0)
  
  return obj
}

module.exports = gen_private