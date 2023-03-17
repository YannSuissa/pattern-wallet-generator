# pattern-wallet-generator

Ethereum pattern wallet generator

Generate a nice and cool public wallet address starting with your favorite pattern 
eg : 0x1111111.... / 0xbabe.... / 0xdeadbeef
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

let wallet;

wallet = wallet_gen("0x4242", with_seed)
console.log("return value", wallet)
wallet = wallet_gen("0x424242", without_seed)
console.log("return value", wallet)
```
