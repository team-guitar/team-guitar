const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Store = require('../models/Store');
const Customer = require('../models/Customer');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 5;
const DEFAULT_TOTAL_PURCHASES = 2500;
const DEFAULT_TOTAL_STORES = 10;
const DEFAULT_TOTAL_CUSTOMERS = 100;

const stores = [
  { 
    products: ['cone1', 'cone2'],
    address: chance.address(),
    name: 'Ben & Jerry`s'
  }, {
    products: ['scoop1', 'scoop2'],
    address: chance.address(),
    name: 'Salt & Straw'
  }
];

const makeStores = (stores) => {
  return [...Array(DEFAULT_TOTAL_STORES)].map(() => {
    return chance.pickone(stores);
  });
};

module.exports = ({
  totalUsers = DEFAULT_TOTAL_USERS,
  totalPurchases = DEFAULT_TOTAL_PURCHASES,
  totalStores = makeStores(stores),
  totalCustomers = DEFAULT_TOTAL_CUSTOMERS
}) => {
  return Promise.all(
    [...Array(totalUsers)].map((ele, i) => User.create({
      email: `Bill${i}@test.com`,
      password: 'password'
    }))
  )
    .then(() => {
      return Promise.all([
        Promise.all(totalStores.map(store => {
          return Store.create({
            products: store.products,
            address: store.address,
            name: store.name
          }); 
        })), 
        Promise.all([...Array(totalCustomers)].map(() => {
          return Customer.create({
            name: 'Lance'
          });
        }))
      ]);
    })
    .then(([stores, customers]) => {
      return Promise.all([...Array(totalPurchases)].map(() => {
        const store = chance.pickone(stores);
        return Purchase.create({
          product: chance.pickone(store.products),
          price: chance.integer({ min: 1, max: 10 }),
          store: store._id,
          customer: chance.pickone(customers)._id
        });
      }));
    });
};
