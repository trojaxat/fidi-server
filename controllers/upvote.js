const handleUpvote = (req, res, db) => {
    const { link, id, score } = req.body;
    db('comments')
        .returning('*')
        .where('id', '=', id)
        .update({ score: score })
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Photo not added'))
}

module.exports = {
    handleUpvote
    }