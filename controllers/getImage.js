const handleGetImage = (req, res, db) => {
    const { email, name, place } = req.body;
    db('photos')
        .returning('link')
        .where({
            email: email,
            name: name
        }).orWhere({
            email:email,
            place:place
        }).select('link')
        .then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not found'))
}

module.exports = {
    handleGetImage