import db from '../../lib/db/';

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await db.Categoty.findAll();

    if (!allCategories) {
      res.status(200).json([]);
    } else {
      res.status(200).json(allCategories);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCategoryByName = async (req, res) => {
  try {
    const title = req.params.title;

    const category = await db.Categoty.findOne({ where: { title } });

    if (!category) {
      res.status(422).json({ message: 'No category found' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default {
  getAllCategories,
  getCategoryByName,
};
