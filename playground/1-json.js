const fs = require('fs');

// const myData = {
//     name: 'sham',
//     planet: 'earth',
//     age: '26',
// };
// const dataJSON = JSON.stringify(myData);
// fs.writeFileSync('1-json.json', dataJSON);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = 'Sham';
data.age = '26';
data.planet = 'Mars';

const newData = JSON.stringify(data);
fs.writeFileSync('1-json.json', newData);

// const dataJSON = dataBuffer.toString();

// const data = JSON.parse(dataJSON);
// console.log(data);
