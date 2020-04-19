const glob = require("glob");
const fs = require('fs');

var getDirectories = function(src, callback) {
    glob(src + '/**/*', callback);
};
getDirectories('public/assets/images/portfolio', function(err, res) {
    var asset = {};
    for (i in res) {
        const name = res[i].split("/");;
        if (!(name[4] in asset)) {
            asset[name[4]] = [];
        }
        if (name[5] != null) {
            asset[name[4]].push(name[5]);
        }
    }

    var json = 'asset = ' + JSON.stringify(asset) + ';';
    fs.writeFile('public/assets/js/picasset.js', json, function(err) {
        if (err) throw err;
        console.log('asset recap complete');
    });
});