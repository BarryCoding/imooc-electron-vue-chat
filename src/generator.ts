// How to make an object iterable?
// 1. Implement the [Symbol.iterator] method
// 2. The [Symbol.iterator] method should return an iterator object
// 3. The iterator object should have a next() method
// 4. The next() method should return an object with the shape: { value: any, done: boolean }
// 5. When done, return only done: true (value is omitted)

const range = {
  from: 1,
  to: 5,
  // The [Symbol.iterator] method makes this object iterable.
  // It returns an iterator object with a next() method.
  [Symbol.iterator]() {
    let current = this.from;
    // The returned object is the iterator.
    return {
      // The next() method returns an object with the shape: { value: any, done: boolean }
      next: () => {
        if (current <= this.to) {
          // When not done, return the next value and done: false
          return { value: current++, done: false };
        } else {
          // When done, return only done: true (value is omitted)
          return { done: true };
        }
      },
    };
  },
};

const run = () => {
  for (const item of range) {
    console.log("item", item);
  }
};

run();
