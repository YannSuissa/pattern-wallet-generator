const ethers = require('ethers');  
const crypto = require('crypto');

let last_sec
let cpt
let time_start

function print(last) {

  curr = performance.now();
  let sec = Number(((curr - time_start) / 1000).toFixed(2))
  let per_sec = Number((cpt / sec).toFixed(2))
  if (!last && sec - last_sec < 1)
    return
  last_sec = sec
  console.log('Speed', cpt, '-', per_sec,'/s', "total seconds", sec) 
}

function find_addr(pattern, with_seed) {
  let id, privateKey, wallet
  let refresh = 100;

  cpt = 0
  time_start = performance.now()

  while (1) {
    cpt++
    if (with_seed) {
      wallet = ethers.Wallet.createRandom()
    } 
    else {
      id = crypto.randomBytes(32).toString('hex');
      wallet = {}
      privateKey = "0x"+id;
      wallet = new ethers.Wallet(privateKey);
      wallet.publicKey = privateKey
    }

    if (!(cpt % refresh)) 
      print()

    if (!wallet.address.startsWith(pattern)) {
      continue
    }
    else {
      print(true)
      return wallet
    }
  }
}

function gen_private(pattern, with_seed) {

  console.log('Starting challenge for', pattern, (with_seed) ? "With seed..." : "Without seed...")
  
  let obj = find_addr(pattern, with_seed)
  
  return obj
}

module.exports = gen_private