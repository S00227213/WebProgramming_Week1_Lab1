const express = require('express');
const app = express();
const port = 3000;
let contacts = [];

app.use(express.json()); // Enable JSON request body parsing

app.get('/', (req, res) => res.send('Hello World from Jack!'));

app.get('/bananas', (req, res) =>
  res.send('Hello world, this is bananas'));

app.get('/cats', (req, res) =>
  res.send('Meow! Hello world, these are cats'));

const jokes = [
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "I used to play piano by ear, but now I use my hands."
];

app.get('/joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.send(jokes[randomIndex]);
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.post('/contacts', (req, res) => {
  const contact = req.body;

  if (!contact || !contact.name) {
    return res.status(400).send('Invalid contact data. Make sure to include the "name" property.');
  }

  console.log(contact); // to check what was received
  contacts.push(contact);

  res.send('Contact has been added to the database');
  console.log(`Contact name is ${contact.name}. Number of contacts is ${contacts.length}`);
});

// Define a route to get all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// delete contact
app.delete('/contacts/:id', (req, res) => {
    let id = req.params.id;
    if (id < 0 || id >= contacts.length) {
      return res.status(404).send('Contact not found');
    }
    console.log(`Removing contact ${contacts[id].name}`);
    contacts.splice(id, 1);
    res.json(contacts);
  });
  
  
  app.get('/contacts/:id', (req, res) => {
    let id = req.params.id;
    res.json(contacts[id]);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
