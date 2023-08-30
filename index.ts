import express from 'express'
import db from './models';
import {books} from './seeders/books'; 
import { customers } from './seeders/customers';
import { rents} from './seeders/rents';
import { createBookHandler, selsectBookByIDHandler, selectAllBookHandler, updateBookHandler, deleteBookHandler } from './controler';
const app = express();
app.use(express.json());
const port = process.env.PORT|| 3005;

app.post('/books', createBookHandler);

app.get('/books/:id', selsectBookByIDHandler);

app.get('/books', selectAllBookHandler);

app.put('/books/:id', updateBookHandler);

app.delete('/books/:id', deleteBookHandler);

db.sequelize.sync().then(()=>{
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
});

// const createbooks = async () => {
//   const promises = books.map(async (book) => {
//     try {
//       await db.book.create(book);
//     } catch (error) {
//       console.error('Error creating book:', error);
//     }
//   });
//   await Promise.all(promises);
//   console.log('Books created successfully.');
// };

// const createcustomers = async () => {
//   const promises = customers.map(async (customer) => {
//     try {
//       await db.customer.create(customer);
//     } catch (error) {
//       console.error('Error creating customer:', error);
//     }
//   });
//   await Promise.all(promises);
//   console.log('customer created successfully.');
// };

//  const createrents = async () => {
//     const promises = rents.map(async (rent) => {
//       try {
//         await db.rent.create(rent);
//       } catch (error) {
//         console.error('Error creating rent:', error);
//       }
//     });
//     await Promise.all(promises);
//     console.log('rent created successfully.');
//   };

//createbooks();
//createcustomers();
//createrents();
