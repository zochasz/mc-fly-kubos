const mongoose = require('mongoose');
const dbName = 'mc-key-kubos';
const dbUri = `mongodb://heroku_mss82qrq:q1ep2iq67u0clcigbgi74oks4o@ds219879.mlab.com:19879/heroku_mss82qrq`;

mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});
