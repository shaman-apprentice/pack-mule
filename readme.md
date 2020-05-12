 # PMap
 Install with `npm i --save @shaman-apprentice/pack-mule`.

## Goals of this library 
- Academic fun of the implementation journey
- A static strong typed interface via TypeScript
- Store key-value pairs not by key object's reference (what native `Map` does), but by a user provided key function
- Access better than *O(n)*, what a naive implementation with two lists would offer

## API
[Typedoc generated docs](https://shaman-apprentice.github.io/pack-mule/index.html).

## ⚠️ Note for babel
In case you use babel for further transpiling you might need to add [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) and [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) in addition to [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env).