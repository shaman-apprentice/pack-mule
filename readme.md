 # PMap
 A TypeScript class providing some Map functionality, which can use anything as key.

 Install with `npm i @shaman-apprentice/pack-mule`.

## Motivation 
Storing keys and values in two separate lists and mapping them over the index, would be much simpler than the inner implementation of `PMap`. But when using it, you don't have to care about the inner implementation 🙈🙉🙊. `PMap` provides the following two benefits:
- A static strong typed interface via TypeScript
- All operations like `get` or `remove` in **O(n)**

## API
[Typedoc generated docs](docs/classes/pmap.html).

## ⚠️ Note for babel
In case you use babel for further transpiling you might need to add [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) and [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) in addition to [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env).