const Chance = require('chance');
const chance = new Chance();

const stores = [
  { 
    products: ['cone1', 'cone2'],
    address: chance.address(),
    name: 'Ben & Jerry`s'
  }, {
    products: ['scoop1', 'scoop2'],
    address: chance.address(),
    name: 'Salt & Straw'
  },
  {
    products: ['scoop1', 'scoop2'],
    address: chance.address(),
    name: 'Coldstone Creamery'
  }, 
  {
    products: ['scoop1', 'scoop2'],
    address: chance.address(),
    name: 'Baskin Robbins'
  }
];

module.exports = {
  stores
};
