// handles the database storage
const multer = require('multer');
// for file upload
var path = require('path');

// Specific audio upload
const storage = multer.diskStorage({
  destination: function (req, file, callback) {  
    callback(null, './public/uploads');  
  },  
    filename: function(req, file, callback) {
        path = path.extname(file.originalname);
        var str = file.originalname;
        var audioType = str.split('.').pop();
        callback(null, req.body.hash + "." + audioType);
    }
});

const handleGetSong = (req, res, db) => {
    const { email, name, place, link } = req.body;
    const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
    res.download(file);
    
    db('photos')
        .returning('*')
        .where({
            email: email
        }).andWhere({
            name: name
        }).orWhere({
            place: place       
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not found'))
}

module.exports = {
    handleGetSong
    }