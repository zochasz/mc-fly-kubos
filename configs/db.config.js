const mongoose = require('mongoose');
const dbName = 'mc-key-kubos';
const dbUri = `mongodb://localhost/mc-key-kubos`;

mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});
