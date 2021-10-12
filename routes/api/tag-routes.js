const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0])
      res.status(200).json(updatedTag[1]);
    else
      res.status(404).json({ message: "No Tag updated." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const productTags = await ProductTag.destroy({
    where: {
      tag_id: req.params.id,
    }
  });

  const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  });

  if(productTags || deleteTag) {
    res.status(200).json({ message: "Tag and associated products removed."})
  } else {
    res.status(404).json({message: "No Tag deleted."})
  }
});

module.exports = router;
