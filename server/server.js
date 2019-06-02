const express = require('express');
const app = express();

const lists =  [
  {
    label: 'to do',
    items: [
      { content: 'create list' },
      { content: 'test item' },
      { content: 'improve ui' }
    ]
  },
  {
    label: 'done',
    items: [
      { content: 'complain to the boss'},
      { content: 'redo ux' }
    ]
  }
];

app.get('/api/lists', (req, res) => {
  setTimeout(() => {
    res.status(400).json(lists);
  }, 3000);
})

app.listen(3000);