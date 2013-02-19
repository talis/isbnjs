var isbn = require('isbn').ISBN;

var fs = require('fs');

// Load full global groups
var groupdata = JSON.parse(fs.readFileSync(path.resolve(__dirname, '/var/isbn-groups.json'),'utf8'));
isbn.GROUPS = groupdata.GROUPS;
isbn.GROUPS_VERSION = groupdata.GROUPS_VERSION;

exports.ISBN = isbn;