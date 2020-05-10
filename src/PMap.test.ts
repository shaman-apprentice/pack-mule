import { SymbolPMap } from './SymbolPMap/SymbolPMap';
import { PMap } from './PMap';

describe('`clone()`', () => {
  it('derives the correct Child-Class type when cloning', () => {
    const map = new SymbolPMap<object, number>();
    // "Test failure" is, if the ts transpiler complains, what leads to an test error.
    const clone: SymbolPMap<object, number> = map.clone();
    clone; // hack to ignore ts unused for previous line
  
    // todo: check for real negative testing
    // The following two is correctly not allowed
    // const clone2: SymbolPMap<Function, number> = map.clone();
    // clone2;
    // const clone3: PMap<number, number> = map.clone();
    // clone3;
  });

  it('can assign a clone to its base class', () => {
    const map = new SymbolPMap<object, number>();
    // "Test failure" is, if the ts transpiler complains, what leads to an test error.
    const clone: PMap<object, number> = map.clone();
    clone; // hack to ignore ts unused for previous line
  });
});
