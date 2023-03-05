import express from 'express';
import data from './data.json';
import cors from 'cors';
import bodyParser from 'body-parser';
import Ajv from 'ajv';
const app = express();
const ajv = new Ajv();

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

const validate = ajv.compile(userSchema);

const corsOptions = {
  origin: '*',
};

const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
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

app.post('/users', (req, res) => {
  const newUser = req.body;
  const valid = validate(newUser);
  if (!valid) {
    res.status(400).json({ error: validate.errors });
  } else {
    newUser.id = data.users.length + 1;
    data.users.push(newUser);
    res.status(201).json(newUser);
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    data.users.splice(userIndex, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
