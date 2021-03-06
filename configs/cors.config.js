// Configuration options: https://www.npmjs.com/package/cors#configuration-options
const originsAllowed = [
    'http://localhost:3000'
];

module.exports = {
    origin: function(origin, cb) {
        const allowed = originsAllowed.indexOf(origin) !== -1;
        cb(null, allowed);
    },
    credentials: true,
}
