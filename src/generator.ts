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

const runWithIterator = () => {
  console.log(`🤖 ~ runWithIterator:`);
  for (const item of range) {
    console.log("item", item);
  }
};

runWithIterator();

// Using a generator function to implement iteration
// A generator function (denoted by the * syntax) can pause and resume execution, yielding multiple values over time.
function* generator() {
  yield 3;
  yield 2;
  yield 1;
}

const gen = generator();
console.log(`🤖 ~ run generator:`);
for (const item of gen) {
  console.log("item", item);
}

const rangeWithGenerator = {
  from: 6,
  to: 10,
  // The * before [Symbol.iterator] makes this a generator method.
  // When for...of is used, this generator runs, yielding values from 'from' to 'to'.
  *[Symbol.iterator]() {
    // The generator maintains its own internal state between yields.
    for (let i = this.from; i <= this.to; i++) {
      yield i; // 'yield' pauses the generator and returns the value to the iterator consumer.
    }
    // When the loop ends, the generator finishes and 'done: true' is returned by the iterator.
  },
};

const runWithGenerator = () => {
  console.log(`🤖 ~ runWithGenerator:`);
  for (const item of rangeWithGenerator) {
    console.log("item", item);
  }
};

runWithGenerator();

const rangeWithAsyncGenerator = {
  from: 11,
  to: 15,
  // The 'async *' before [Symbol.asyncIterator] makes this a generator method.
  async *[Symbol.asyncIterator]() {
    for (let i = this.from; i <= this.to; i++) {
      // wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield i;
    }
  },
};

const runWithAsyncGenerator = async () => {
  console.log(`🤖 ~ runWithAsyncGenerator:`);
  for await (const item of rangeWithAsyncGenerator) {
    console.log("item", item);
  }
};

runWithAsyncGenerator();
