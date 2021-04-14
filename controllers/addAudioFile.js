const handleAddAudioFile = (req, res, db) => {
    console.log(req);

    const { name, hash, size, lastModified } = req.body;
    
    db('audio-file')
        .returning('*')
        .where('email', '=', email)
        .insert({
            hash: comment, 
            name: email, 
            size: link, 
            id: id,
            lastModified: 1,
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Audio file not added'))
    
        var upload = multer({storage: storage});
        app.get('/api/file',function(req,res){
            res.sendfile('C:/syed ayesha/nodejs/uploads/video/views/video.html');
        });
        app.post('/api/file',upload.single('userFile'), function(req, res) {
            console.log(req.file);
            console.log(req.file.path);
            res.send(rand);
        })
        
    
}

module.exports = {
    handleAddAudioFile
    }