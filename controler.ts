import db from './models';
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