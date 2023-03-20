const ethers = require('ethers');  
const crypto = require('crypto');
const {Worker} = require("worker_threads");

let last_sec
let cpt = 0
let time_start

let p_pattern, p_with_seed, p_debug;

function print(pid, last) {

  curr = performance.now();
  let sec = Number(((curr - time_start) / 1000).toFixed(2))
  let per_sec = Number((cpt / sec).toFixed(2))
  if (!last && sec - last_sec < 1)
    return
  last_sec = sec
  console.log('[' + pid + '] Speed', cpt, '-', per_sec,'/s', "total seconds", sec) 
}

async function find_addr(pid) {

  let id, privateKey, wallet
  let refresh = 100;

  cpt = 0
  time_start = performance.now()

  while (1) {
    cpt++
    if (p_with_seed) {
      wallet = ethers.Wallet.createRandom()
    } 
    else {
      id = crypto.randomBytes(32).toString('hex');
      wallet = {}
      privateKey = "0x"+id;
      wallet = new ethers.Wallet(privateKey);
      wallet.publicKey = privateKey
    }

    if (p_debug && !(cpt % refresh)) 
      print(pid)

    if (!wallet.address.startsWith(p_pattern)) {
      continue
    }
    else {
      print(pid, true)
      return wallet
    }
  }
}

function gen_private(pattern, with_seed, debug) {

  p_pattern = pattern
  p_with_seed = with_seed
  p_debug = debug

  if (debug)
    console.log('Starting challenge for', pattern, (with_seed) ? "With seed..." : "Without seed...",
    "odds are : 1 / ", 16 ** pattern.replace("0x", "").length)
  
  let obj = {}
  obj = find_addr(0)
  
  return obj
}

module.exports = gen_private