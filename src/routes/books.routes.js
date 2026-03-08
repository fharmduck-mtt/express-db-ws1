const express = require('express');
const booksRepo = require('../repositories/books.repo');

const router = express.Router();

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit || 20);
  const books = await booksRepo.listBooks(limit);
  res.json({ data: books });
});

module.exports = router;