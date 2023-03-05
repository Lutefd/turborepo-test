import express from 'express';
import data from './data.json';
import cors from 'cors';
const app = express();

const corsOptions = {
  origin: '*',
};

const port = process.env.PORT || 8000;

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send(
    data.users.map((user: (typeof data.users)[number]) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    })
  );
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:3000`);
});
