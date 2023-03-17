# pattern-wallet-generator

Ethereum pattern wallet generator

Usage : 

```js
  let wallet;
  const with_seed = true
  const without_seed = false

  wallet = gen_private("0x4242", with_seed)
  console.log("return value", wallet)
  wallet = gen_private("0x424242", without_seed)
  console.log("return value", wallet)
```
