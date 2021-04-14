const handleAddAudioFile = (req, res, db) => {
    console.log(req.body);

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
}

module.exports = {
    handleAddAudioFile
    }