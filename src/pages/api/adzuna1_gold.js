// pages/api/adzuna.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { what } = req.query;
    const { data } = await axios.get('https://api.adzuna.com/v1/api/jobs/gb/search/1', {
      params: {
        app_id: '9138079d',
        app_key: 'ae558c63fea85f27e8293e6c94f4b53f',
        what, // Use the selected language passed from the frontend
        results_per_page:15,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Adzuna API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
