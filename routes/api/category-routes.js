const router = require('express').Router();
// const { DataTypes } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then((categoryData) => {
    res.json(categoryData)
  });
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id)

  return res.json(categoryData)
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then((newCategory) => {
      res.json(newCategory)
    })
    .catch((err) => {
      res.json(err)
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
