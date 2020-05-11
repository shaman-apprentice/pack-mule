 # PMap
 A TypeScript library providing some Map functionality, which can use anything as key (and not only `string` or `symbol` as plain JS Objects).

 Install with `npm i @shaman-apprentice/pack-mule`.

## Goals of this library 
- A static strong typed interface via TypeScript
- All operations like `get` or `remove` in **O(n)**

## API
[Typedoc generated docs](https://shaman-apprentice.github.io/pack-mule/index.html).

## ⚠️ Note for babel
In case you use babel for further transpiling you might need to add [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) and [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) in addition to [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env).