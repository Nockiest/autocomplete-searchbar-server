import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.get('/search', async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM your_table WHERE name ILIKE $1`,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});