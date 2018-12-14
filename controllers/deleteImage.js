const handleDeleteImage = (req, res, db) => {
    const { email, link } = req.body;
    db('photos')
        .returning('*')
        .delete({
            email: email,
            link: link
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo deleted'))
}

module.exports = {
    handleDeleteImage
    }