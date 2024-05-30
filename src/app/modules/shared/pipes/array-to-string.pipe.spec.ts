import { ArrayToStringPipe } from './array-to-string.pipe';

describe('ArrayToStringPipe', () => {

  it('should return empty string for empty array', () => {
    const pipe = new ArrayToStringPipe();
    expect(pipe.transform([])).toBe('');
  });

  it('should return string of array elements for string array', () => {
    const pipe = new ArrayToStringPipe();
    expect(pipe.transform(['a', 'b', 'c'])).toBe('a, b, c');
  });

  it('should return string of object properties for object array', () => {
    const pipe = new ArrayToStringPipe();
    const array = [{ name: 'John' }, { name: 'Doe' }];
    expect(pipe.transform(array, 'name')).toBe('John, Doe');
  });

  it('should return empty string for object array without property', () => {
    const pipe = new ArrayToStringPipe();
    const array = [{ name: 'John' }, { name: 'Doe' }];
    expect(pipe.transform(array)).toBe('');
  });
});
