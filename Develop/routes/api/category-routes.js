const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categoryData` endpoint

// router.get('/', async (req, res) => {
//   // find all categoryData
//   // be sure to include its associated Products
//   try {
//     const categoryData = await Category.findAll( {
//       include: [{ model: Product, as:'ProductMZ'}]
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: 'Nothing to see!' });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



router.get('/', async(req, res) => {
  // find all categoryData
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll( {
      include: [{ model: Product, as: 'ProductMZ' }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id,{
      include : [{ model: Product, as:'ProductMZ'}]
    });

    if (!categoryData) {
      res.status(404).json({message: 'Fuck!'});
      return;
    }
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'Nothing with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Nothing with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
