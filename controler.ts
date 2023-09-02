import db from './models';
import bcrypt from 'bcrypt';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
export const createBookHandler = async (req: any, res: any) => {
    try {
      console.log('Received request body:', req.body);
      const book = {
        id: req.body.id,
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author
      }
      const newBook = await db.book.create(book);
      console.log('New book created:', newBook);
      res.json(newBook);
    } catch (error) {
      console.error('Error post book:', error);
      res.status(500).json({ error: 'An error occurred while post the book.' });
    }
  }

export const selsectBookByIDHandler = async (req: any, res: any) => {
  const bookId = req.params.id;
  try {
    const book = await db.book.findByPk(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'An error occurred while fetching the book.' });
  }
}

export const selectAllBookHandler = async (req: any, res: any) => {
    try {
      const books = await db.book.findAll();
      res.json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'An error occurred while fetching the books.' });
    }
  }

 export const updateBookHandler = async (req: any, res: any) => {
  const bookId = req.params.id; 
  const bookUpdates = {
    name: req.body.name,
    isbn: req.body.isbn,
    author: req.body.author
  };
  try {
    const existingBook = await db.book.findByPk(bookId);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }
        await existingBook.update(bookUpdates);

    console.log('Book updated:', existingBook);
    res.json(existingBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'An error occurred while updating the book.' });
  }
}

export const deleteBookHandler = async (req: any, res: any) => {
    const bookId = req.params.id;
    try {
      const deletedCount = await db.book.destroy({ where: { id: bookId } });
      if (deletedCount > 0) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).json({ error: 'Book not found.' });
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
  }

  export const customerHandler = async (req: any, res: any) => {
    try {
      const customerPass = req.body.pass;
      const salt = await bcrypt.genSalt();
      const hashedpass = await bcrypt.hash(customerPass, salt);
      const customerOp =  {
        id: req.body.id,
        name: req.body.name,
        registrationDate: req.body.registrationDate,
        pass: hashedpass
        }
      const newCustomer = await db.customer.create(customerOp);
      console.log('Customer added', newCustomer);
      res.json(newCustomer);
    } catch (error) {
      console.error('Error while add Customer', error);
      res.status(500).json({ error: 'An error occurred while add Customer.' });
    }
  }

  export const customerLoginHandler = async (req: any, res: any) => {
    try {
      const customer =  await db.customer.findByPk(req.body.id);
      if(customer == null){
            return res.status(400).send('cannot find Customer')
      }
     if(await bcrypt.compare(req.body.pass, customer.pass)) {
        res.send('Success');
     }else{
        res.send('Not Allowed');
     }
    } catch (error) {
      console.error('Error while login Customer', error);
      res.status(500).json({ error: 'An error occurred while login Customer.' });
    }
  }

  export const customerLoginAuthenticateHandler = async (req: any, res: any) => {
    try {
        const customerOp =  {
            id: req.body.id,
            name: req.body.name,
            registrationDate: req.body.registrationDate,
            pass: req.body.pass
            }
        const accessToken = jwt.sign(customerOp,
            "b3e287cb03136b4a11ee1d5804fd82b5e6e94f9a5a079d90e8bde62844d821d44c631afae2d93a2a736d22f032007554aa0e47ebb74bb8416556c55b2f952be7");
         //process.env.ACCESS_TOKEN_SECRET
         res.json({accessToken: accessToken});
    } catch (error) {
      console.error('Error while Authenticate Customer', error);
      res.status(500).json({ error: 'An error occurred while Authenticate Customer.' });
    }
  }
  

export function authenticateToken(req: any, res: any, next: any){
    const authHeader = req.headers['authorization'];
    const token =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401).json({ error: 'An error occurred in AuthenticatToken function' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, customerOp: any)=>{
            if(err) return res.sendStatus(403);
            req.customerOp = customerOp;
            next();
        });

}
export const customerLoginHandler2 = async (req: any, res: any) => {
    try {
     res.json(db.customer.findByPk(req.body.id))
    } catch (error) {
      console.error('Error while login Customer', error);
      res.status(500).json({ error: 'An error occurred while login Customer.' });
    }
  }

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
