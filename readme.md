 # PMap
 A TypeScript library providing some Map functionality, which can use anything as key (and not only `string` or `symbol` as plain JS Objects).

 Install with `npm i --save @shaman-apprentice/pack-mule`.

## Goals of this library 
- Academic fun of implementing it
- A static strong typed interface via TypeScript
- [HashPMap](https://shaman-apprentice.github.io/pack-mule/classes/hashpmap.html) maps by calculated hash value and not by reference
- All operations like `get` or `remove` in **O(log(n))** (note that a proper implemented HashMap can do it in *O(1)* - but as I have a small HashMap the overhead would be bigger than this *O*-reduction)

## API
[Typedoc generated docs](https://shaman-apprentice.github.io/pack-mule/index.html).

## ⚠️ Note for babel
In case you use babel for further transpiling you might need to add [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) and [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) in addition to [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env).