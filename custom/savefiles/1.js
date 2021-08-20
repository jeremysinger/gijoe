var papaList = Papa.parse("1,2,3,4,5,6,7,8,9");

console.log(papaList.data);

var papaString = Papa.unparse(papaList);

console.log(papaString);