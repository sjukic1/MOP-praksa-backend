import db from '../../lib/db/';
import categoriesJSON from '../helpers/seed/categories.json';

const generateDatabaseData = async () => {
  try {
    const categories = await db.Categoty.bulkCreate(categoriesJSON);

    await Promise.all(categories);
  } catch (err) {
    console.log(err);
  }
};

export default generateDatabaseData;
