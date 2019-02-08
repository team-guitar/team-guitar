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

const storeTemplates = [
  { 
    flavors: ['Salted Caramel Core', 'Strawberry Cheesecake', 'Chunky Monkey', 'Chocolate Chip Cookie Dough', 'Chocolate Fudge Brownie'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: chance.pickone(cities),
    name: 'Ben & Jerry`s'
  }, {
    flavors: ['Sea Salt with Caramel', 'Lavender Honey', 'The Elvis', 'Strawberry Honey Balsamic with Black Pepper', 'Coconut Mint Chip Cupcake'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: chance.pickone(cities),
    name: 'Salt & Straw'
  },
  {
    flavors: ['Strawberry Banana Rendezvous', 'Chocolate Devotion', 'Mint Mint Chocolate Chocolate Chip', 'Birthday Cake Remix', 'Cheesecake Fantasy'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: chance.pickone(cities),
    name: 'Coldstone Creamery'
  }, 
  {
    flavors: ['Oreo Cookies and Cream', 'Rocky Road', 'Rainbow Sherbert', 'Peanut Butter ’n Chocolate', 'Very Berry Strawberry'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: chance.pickone(cities),
    name: 'Baskin Robbins'
  },
  {
    flavors: ['Coding and Cream', 'CSSherbert', 'Mint JavaChip', 'Nested Fruit Loops', 'Semantic Strawberry, Chicken Mint Shawarma'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: chance.pickone(cities),
    name: 'Alchemy Cream Lab'
  }
];

const makeStores = (numOfStores) => {
  return [...Array(numOfStores)].map(() => {
    return chance.pick(storeTemplates);
  });
};
const stores = makeStores(50);
module.exports = {
  stores
};
