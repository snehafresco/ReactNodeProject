const express = require('express');
// const res = require('express/lib/response');

const connectDB = require('./config/db');

const app = express();

//connect database 
connectDB();

//init middleware
app.use(express.json({ exdended: false}));

// app.get('/',(req, res) => res.send('API Running'));
// //define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
