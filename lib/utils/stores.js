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

const weights = [
  10,
  10,
  15,
  20,
  20,
  20,
  15,
  15,
  15,
  20
];

const stores = [
  { 
    products: ['Salted Caramel Core', 'Strawberry Cheesecake', 'Chunky Monkey', 'Chocolate Chip Cookie Dough', 'Chocolate Fudge Brownie'],
    address: chance.weighted(cities, weights),
    name: 'Ben & Jerry`s'
  }, {
    products: ['Sea Salt with Caramel', 'Lavender Honey', 'The Elvis', 'Strawberry Honey Balsamic with Black Pepper', 'Coconut Mint Chip Cupcake'],
    address: chance.weighted(cities, weights),
    name: 'Salt & Straw'
  },
  {
    products: ['Strawberry Banana Rendezvous', 'Chocolate Devotion', 'Mint Mint Chocolate Chocolate Chip', 'Birthday Cake Remix', 'Cheesecake Fantasy'],
    address: chance.weighted(cities, weights),
    name: 'Coldstone Creamery'
  }, 
  {
    products: ['Oreo Cookies and Cream', 'Rocky Road', 'Rainbow Sherbert', 'Peanut Butter ’n Chocolate', 'Very Berry Strawberry'],
    address: chance.weighted(cities, weights),
    name: 'Baskin Robbins'
  },
  {
    products: ['Coding and Cream', 'CSSherbert', 'Mint JavaChip', 'Nested Fruit Loops', 'Semantic Strawberry'],
    address: chance.weighted(cities, weights),
    name: 'Alchemy Cream Lab'
  }
];

module.exports = {
  stores
};
