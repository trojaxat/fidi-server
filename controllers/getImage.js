const handleGetImage = (req, res, db) => {
    const { email, name, place, link } = req.body;
    db('photos')
        .returning('*')
        .where({
            email: email
        }).andWhere({
            name: name
        }).orWhere({
            place: place       
        }).orWhere({
            link: link
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not found'))
}

module.exports = {
    handleGetImage
    }