// pages/api/adzuna.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { what } = req.query;
   // http://localhost:3000/api/adzuna1?id=4429663130
    const { data } = await axios.get('https://api.adzuna.com/v1/api/jobs/gb/search/1', {
      params: {
        app_id: '131001b2',
        app_key: '564370e4a2ccffaa41a55bbd8a12e6a9',
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
