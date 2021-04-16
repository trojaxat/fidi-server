// Handles the file downloading
const path = require('path');
const downloader = require("../helpers/downloader");

const handleGetSong = (req, res, db) => {
    const { email, hash } = req.body;
    // if no user email, condition of no private tracks
    if (!email && hash) {
        db('audio_files')
            .returning('*')
            .where({
                hash: hash    
            }).then(audio => {
                let fileType = audio[0].name.split('.').pop();
                let songPath = path.resolve("public/uploads");
                let fileName = hash + "." + fileType;
                res.type(fileType);
                return res.download(songPath + "//" + fileName, fileName);
            }).catch(err => res.status(400).json('Song error'))
    // if user email address given and is a track owner or is a collaborator
    } else if (email && hash) {
                db('audio_files')
            .returning('*')
            .where({
                hash: hash
            }).andWhere({
                email: email 
            }).then(audio => {
                // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
                if (res.json(audio[0])) {
                    let fileType = res.json(audio[0]).name.split('.').pop();
                    let songPath = "./public/uploads/" + hash + fileType;
                    return res.send(songPath)
    //                let x = res.download("./public/uploads/" + hash + fileType);
                    // let x = downloader.handleDownloadFile(songPath, fileType);
                }
            }).catch(err => res.status(400).json('Song not found'))
    } 

}

module.exports = {
    handleGetSong
    }