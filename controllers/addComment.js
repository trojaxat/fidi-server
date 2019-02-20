const handleAddComment = (req, res, db) => {
    const { email, comment, link, id } = req.body;
    db('comments')
        .returning('*')
        .where('email', '=', email)
        .insert({
            comment: comment, 
            email: email, 
            link: link, 
            id: id
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not added'))
}

module.exports = {
    handleAddComment
    }