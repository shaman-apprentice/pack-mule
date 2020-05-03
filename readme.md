 # PMap
 A class providing some Map functionality, which can use anything as key. Includes **index.d.ts**.

 Install with `npm i @shaman-apprentice/pack-mule`.

## Motivation 
Storing keys and values in two separate lists and mapping them over the index, would be much simpler than the inner implementation of `PMap`. But when using it, you don't have to care about the inner implementation. `PMap` provides the following two benefits:
- A static strong typed interface via TypeScript
- All operations like `get` or `remove` in **O(n)**

## API
### PMap<K, V> implements Iterable<Entry<K, V>>
| Function name | Parameter                                      | Returns      | Description  |
|:------------- |:---------------------------------------------- |:-------------|:-------------|
| `constructor` | `entries?: Entry<K, V>[]`                      | `this`       | Optional List of [Entries](#Entry<K,-V>) to be initialized with |
| clone         |                                                | `Map<K, V>`  | A new instance containing same key-value pairs |
| get           | `key: K`                                       | `V`          | Value stored for given key, or `undefined` |
| has           | `key: K`                                       | `boolean`    | Wether the map contains the key or not |
| keys          |                                                | `K[]`        | List of all keys (including those with `value === undefined`) |
| remove        | `key: K`                                       | `V`          | Removes the key and returns the related value |
| removeAll     | `keys: K[]`                                    | `V[]`        | Removes the keys and returns the related values |
| set           | `key: K`                                       | `V`          | Stores the key-value pair and returns the old value stored for the given key or undefined |
|               | `value: V`                                     |              |  |
| setAll        | `keys: K[]`                                    | `V[]`        | Stores the key-value pairs and returns the old values stored for the given keys |
|               | `values: V[]`                                  |              |  |
| size *(getter)*|                                                | `number`     | Amount of stored key-value pairs |
| toList        |                                                | `Entry<K, V>[]`| Returns List of all stored [Entries](#Entry<K,-V>) |
| values        |                                                | `V[]`        | Returns all stored values |
|               |                                                |              | |
| difference    | `other: PMap<K, any>`                          | `PMap<K, V>` | Returns a shallow clone without the keys of `other` |
| intersection  | `other: PMap<K, any>`                          | `K[]`   | Returns all keys, which are present in both `this` **and** `other` |
| union         | `other: PMap<K, any>`                          | `PMap<K, V>` | Returns shallow clone containing all key-value pairs of `this` and `other` |
|               | `mergeF: (key: K, v1: V, v2: any) => any = (k,v1,v2) => v1)` |    | Merge function to resolve key conflicts |


### Entry<K, V>
| property| type |
|:------- |:-----|
| key     | K    |
| value   | V    |

## ⚠️ Note for babel
In case you use babel for further transpiling you might need to add [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) and [transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) in addition to [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env).