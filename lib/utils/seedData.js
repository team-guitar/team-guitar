const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Store = require('../models/Store');
const Customer = require('../models/Customer');
const Chance = require('chance');
const chance = new Chance();
const { stores } = require('./stores');



const DEFAULT_TOTAL_USERS = 5;
const DEFAULT_TOTAL_PURCHASES = 2500;
const DEFAULT_TOTAL_STORES = 50;
const DEFAULT_TOTAL_CUSTOMERS = 200;




module.exports = ({
  totalUsers = DEFAULT_TOTAL_USERS,
  totalPurchases = DEFAULT_TOTAL_PURCHASES,
  totalStores =  DEFAULT_TOTAL_STORES,
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
        Promise.all(stores.slice(0, totalStores).map(store => {
          return Store.create({
            flavors: store.flavors,
            sizes: store.sizes,
            address: chance.pickone(store.address),
            name: store.name
          }); 
        })), 
        Promise.all([...Array(totalCustomers)].map(() => {
          return Customer.create({
            name: chance.name({ nationality: 'en' }),
            phone: chance.phone()
          });
        }))
      ]);
    })
    .then(([stores, customers]) => {
      return Promise.all([...Array(totalPurchases)].map(() => {
        const store = chance.pickone(stores);
        return Purchase.create({
          flavor: chance.pickone(store.flavors),
          size: chance.pickone(store.sizes),
          price: chance.integer({ min: 1, max: 10 }),
          store: store._id,
          customer: chance.pickone(customers)._id
        });
      }));
    });
};
