const glob = require("glob");
const fs = require('fs');

var getDirectories = function(src, callback) {
    glob(src + '/**/*', callback);
};

getDirectories('public/assets/images/portfolio', function(err, res) {
    var asset = {
        'types': [],
        'images': [],
    };
    for (i in res) {
        const name = res[i].split("/");;
        if (name[5] == null) {
            asset.types.push(name[4]);
        } else {
            asset.images.push({
                'type': name[4],
                'name': name[5]
            });
        }
    }

    fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj['asset'] = asset;
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('config.json', json, 'utf8', function(err) {
                if (err) throw err;
                console.log('asset recap complete');
            }); // write it back 
        }
    });
});