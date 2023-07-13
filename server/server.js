const express = require('express');
const app = express();
const path = require('node:path');
const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURL);
const udb = mongoose.connection;
udb.on('error', console.error.bind(console, 'connection error:'));
udb.once('open', function () {
  console.log('db connected');
});

const studentSchema = new mongoose.Schema({
  name: String,
});
const student = mongoose.model('student', studentSchema);

app.get('/api', async (req, res) => {
  try {
    let object = await student.find();
    res.send(object);
  } catch (err) {
    console.log(err);
  }
  console.log('request made');
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
