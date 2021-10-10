const promise = Promise.resolve(1);

(async function a () {
  const a = await(promise);
  console.log(a);
})()