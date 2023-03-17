# pattern-wallet-generator

Ethereum pattern wallet generator

Generate a nice and cool public wallet address starting with your favorite pattern 
eg : ```0x1111111....``` / ```0xbabe....``` / ```0xdeadbeef....```
Can generate seed or not (10x faster without)

Install 

```
npm install pattern-wallet-generator
```
or 

```
yarn add pattern-wallet-generator
```

Usage : 

```js
const wallet_gen = require('pattern-wallet-generator')

const with_seed = true
const without_seed = false
const debug = true           //print performance debug 

let wallet;

wallet = wallet_gen("0x4242", with_seed, debug)
console.log("return value", wallet)
wallet = wallet_gen("0x424242", without_seed, debug)
console.log("return value", wallet)
```

```
Wallet {
  provider: null,
  address: '0x4242EA46Bb0854139418AaA39677dfA4985cbA5D',
  publicKey: '0x8b0cc12a6dae8f5f4678540f51b66a30dc9492684dc9ca9c481bd3c0ba6f663d'
}
```
