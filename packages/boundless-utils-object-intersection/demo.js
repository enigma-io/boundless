import intersect from './index';

const obj1 = { foo: 'bar', bar: 'baz', baz: 'fizz' };
const obj2 = { bar: 'x' };

intersect(obj1, obj2); // returns `{bar: 'baz'}`
