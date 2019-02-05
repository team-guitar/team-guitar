const Chance = require('chance');
const chance = new Chance();

const  cities = [
  'Ellensburg,WA', 
  'Spokane, WA', 
  'Medford, OR', 
  'San Francisco, CA', 
  'Los Angeles, CA', 
  'San Diego, CA', 
  'Oakland, CA',
  'Portland, OR',
  'Seattle,WA',
  'San Jose, CA'
];

const stores = [
  { 
    products: ['cone1', 'cone2'],
    address: chance.pickone(cities),
    name: 'Ben & Jerry`s'
  }, {
    products: ['scoop1', 'scoop2'],
    address: chance.pickone(cities),
    name: 'Salt & Straw'
  },
  {
    products: ['scoop1', 'scoop2'],
    address: chance.pickone(cities),
    name: 'Coldstone Creamery'
  }, 
  {
    products: ['scoop1', 'scoop2'],
    address: chance.pickone(cities),
    name: 'Baskin Robbins'
  }
];

module.exports = {
  stores
};
