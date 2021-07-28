const utils = require("./utils");

function compare(o1, o2) {
  res = (JSON.stringify(o1) === JSON.stringify(o2));  
  if (!res) {
    console.log(o1);
    console.log(o2);
  }
  return res;
}

inp = [1, 2, 3, 4, 5];
x = 2;
exp = [[1, 2], [3, 4], [5]];

out = utils.chunkify(inp, x);
console.log(compare(out, exp));

inp = [1, 2, 3, 4];
x = 2;
exp = [[1, 2], [3, 4]];
out = utils.chunkify(inp, x);
console.log(compare(out, exp));
