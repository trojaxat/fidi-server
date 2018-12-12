const handleAddImage = (req, res, db) => {
    const { email, link, place, id } = req.body;
    db('photos')  
        .where('email', '=', email)
        .insert({link: link, email: email, place: place, id: id})
        .returning('link')
        .then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not added'))
}

module.exports = {
    handleAddImage
    }