import express from 'express'
import db from './models';
import jwt from 'jsonwebtoken';
import {books} from './seeders/books'; 
import { customers } from './seeders/customers';
import { rents} from './seeders/rents';
import { createBookHandler, selsectBookByIDHandler, selectAllBookHandler, updateBookHandler, deleteBookHandler, customerHandler, customerLoginHandler, customerLoginAuthenticateHandler, authenticateToken} from './controler';
const app = express();
app.use(express.json());
import bcrypt from 'bcrypt';
const port = process.env.PORT|| 3005;

app.post('/books', createBookHandler);

app.get('/books/:id', selsectBookByIDHandler);

app.get('/books', selectAllBookHandler);

app.put('/books/:id', updateBookHandler);

app.delete('/books/:id', deleteBookHandler);

app.post('/customer', customerHandler);

app.post('/customer/login', customerLoginHandler);

app.post('/customer/Authenticate', customerLoginAuthenticateHandler);

app.get('/customer',authenticateToken,async(req, res)=>{//get post
  res.json( await db.customer.findByPk(req.body.id))
})

db.sequelize.sync().then(()=>{
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
});

