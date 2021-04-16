var http = require('http'),
    ms = require('mediaserver');

const handlePlayMediaServer = (req, res, mediaPath) => {
    let serverPath =  "./public/uploads/" + req.params.id;
    ms.pipe(req, res, serverPath);
    return  req.params.id;
}

module.exports = {
    handlePlayMediaServer
    }
