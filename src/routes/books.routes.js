const express = require('express');
const booksRepo = require('../repositories/books.repo');

const router = express.Router();

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit || 20);
  const books = await booksRepo.listBooks(limit);
  res.json({ data: books });
});

router.get('/:id', async(req, res) => {
  const id = req.params.id
  const book = await booksRepo.getBookByID(id)
  if (!book) {
    res.status(404).json({error: "Book not found."})
  }
  res.json({ data:book})
})

router.post('/', async (req, res) =>{
  
  const title = req?.body?.title
  const author = req?.body?.author
  
  if (!title || !author) {
    return res.status(400).json({message: "title and author are required."})
  }

  const created = await booksRepo.createBook(title, author);
  res.status(201).json({data: created})
  
})

module.exports = router;