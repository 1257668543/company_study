// const goods = [7,8,5,2,1,9];
// const goods = [14];
// const goods = [];
// const goods = [1];
// const goods = [1,1,1];
// const goods = [13,13,13];
// const goods = [1,2,3,4,5,6];
// const goods = [1,2,12,1000,2000];
// const goods = [1,2,3,4,5,6,7,7,8,8,9,10,12,13,13,13,13,17,499,699,599,1999];
const goods = [2,2,2,2,2,2,4];
const total = 6;
// const limit = 3;
const limit = 3;
const number = 7;

function leastCoupon(number, goods, total, limit) {
  if (number === 0 || limit === 0) {
    return 0;
  }
  let ans = 0;
  const chosenGoods = new Array(goods.length).fill(0);
  const res = [];
  goods.sort((a, b) => b - a);
  for (let i = 0; i < goods.length; i++) {
    if (chosenGoods[i]) {
      // 已被选中的商品直接跳过
      continue;
    }
    if (goods[i] >= total) {
      // 价格大于等于total
      res.push([goods[i]])
      ans++;
    } else {
      // 可以组合其他商品
      if (goods[i] + goods[chosenGoods.lastIndexOf(0)] > total) {
        // 与现有最低价格也不能组合
        res.push([goods[i]]);
        ans++;
        continue
      }
      const currentGroup = [goods[i]];
      let groupTotal = goods[i];
      let groupNums = 1;
      chosenGoods[i] = 1;
      for (let j = i; j < goods.length; j++) {
        if (groupTotal + goods[j] <= total && groupNums < limit && !chosenGoods[j]) {
          chosenGoods[j] = 1;
          currentGroup.push(goods[j]);
          groupTotal += goods[j];
          groupNums ++;
          if (groupNums === limit || groupTotal >= total) {
            // 数量或金额达到优惠券上限
            break;
          }
        }
      }
      res.push(currentGroup);
      ans++;
    }
  }

  console.log(...res);
  return ans;
}

console.time("consume");
console.log(leastCoupon(number, goods, total, limit));
console.timeEnd("consume");

