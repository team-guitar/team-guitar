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

module.exports = ({
  totalUsers = DEFAULT_TOTAL_USERS,
  totalPurchases = DEFAULT_TOTAL_PURCHASES,
  totalStores = DEFAULT_TOTAL_STORES,
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
        // Promise.resolve(users),
        Promise.all([...Array(totalStores)].map(() => {
          return Store.create({
            products: ['cone', 'chocolate scoops'],
            address: 'String',
            name: 'Raskin Bobbins'
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
        return Purchase.create({
          product: chance.pickone(stores[0].products),
          price: chance.integer({ min: 1, max: 10 }),
          store: chance.pickone(stores)._id,
          customers: chance.pickone(customers)._id

        });
      }));
    });

};
