const ethers = require('ethers');  
const crypto = require('crypto');
const {Worker} = require("worker_threads");

let last_sec
let cpt = 0
let time_start

let p_pattern, p_with_seed, p_debug, p_odds;

function print(pid, last) {

  curr = performance.now();
  let sec = Number(((curr - time_start) / 1000).toFixed(0))
  let per_sec = Number((cpt / sec).toFixed(0))
  if (!last_sec) {
    last_sec = sec
    return
  }
  if (!last && sec - last_sec < 10)
    return
  last_sec = sec
  console.log('[' + pid + '] Tries', cpt, '- Speed', per_sec, '/s - ', 
    "Elapsed", Number((sec / 60).toFixed(0)), "minutes - ",
    "estimated", Number((p_odds / per_sec / 4800).toFixed(2)), "hours") 
}

async function find_addr(pid) {

  let privateKey, wallet
  let refresh = 500;

  time_start = performance.now()

  while (1) {
    cpt++
    if (p_with_seed) {
      wallet = ethers.Wallet.createRandom()
    } 
    else {
      privateKey = "0x" + crypto.randomBytes(32).toString('hex');
      wallet = new ethers.Wallet(privateKey);
    }

    if (p_debug && !(--refresh)) {
      // console.log('refresh', refresh)
      print(pid)
      refresh = 500
    }

    if (!wallet.address.startsWith(p_pattern)) 
      continue
    else {
      wallet.publicKey = privateKey
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