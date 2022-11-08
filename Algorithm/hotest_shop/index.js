const shops = [[499,1], [499, 0]];
const customers = [[500, 500, 500]];


function hotestShop(shops, customers) {
  if (!shops || !customers || !Array.isArray(shops) || !Array.isArray(customers)) {
    return [];
  }
  const shopsVistor = new Array(shops.length);
  shops.forEach(([shopX, shopY], idx) => {
    let visitor = 0;
    customers.forEach(([customX, customY, customR]) => {
      if (Math.pow(shopX - customX, 2) + Math.pow(shopY - customY, 2) <= Math.pow(customR, 2)) {
        visitor ++;
      }
    })
    shopsVistor[idx] = visitor;
  });
  
  const maxVisitor = Math.max(...shopsVistor);
  return [shopsVistor.findIndex(visitor => visitor === maxVisitor), maxVisitor];
}

console.log(hotestShop(shops, customers));
