const handleGetImageByLink = (req, res, db) => {
    const { email, link } = req.body;
    db('photos')
        .returning('*')
        .where({
            email: email
        }).andWhere({
            link: link     
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not found'))
}

module.exports = {
    handleGetImageByLink
    }