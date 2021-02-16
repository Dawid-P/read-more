import dbConnect from '../../../utils/dbConnect';
import Pages from '../../../models/Pages';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const pages = await Pages.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: pages });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const page = await Pages.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: page });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
