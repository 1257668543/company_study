const { readFile } = require('fs');

const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo.catch(err => err))
});

// const result = Promise.resolve(foo);

result.then(res => {
  console.log('result ---', JSON.stringify(res));
})
.catch(err => {
  console.log('error ---', err);
})