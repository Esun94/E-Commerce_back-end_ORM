const router = require('express').Router();
// const { DataTypes } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll ({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  

  // return res.json(categoryData)
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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deletedCategory) {
      res.status(200).json({ message: "Category Deleted" });

    } else {
      res.status(404).json({ message: "Category Not Found" });
    }
    
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
