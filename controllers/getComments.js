const handleGetComments = (req, res, db) => {
    const { link, id } = req.body;
    db('comments')
        .returning('comment')
        .where({
            id: id
        }).andWhere({
            link: link     
        }).then(link => {
        return res.json(link[0])
        }).catch(err => res.status(400).json('Coments not found'))
}

module.exports = {
    handleGetComments
    }