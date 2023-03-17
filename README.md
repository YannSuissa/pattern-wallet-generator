# pattern-wallet-generator

Ethereum pattern wallet generator

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
