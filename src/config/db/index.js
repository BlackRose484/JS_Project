const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://hunguet112:hung484@cluster0.q193fzl.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connect Success');
  } catch (error) {
    console.log('Fail');
  }
}

module.exports = { connect };
