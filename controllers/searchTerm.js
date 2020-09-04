const handleSearchTerm = (req, res, db) => {
    const { searchTerm } = req.body;
    db('politicians')
        .returning('name')
        .where({
            name: searchTerm
        }).then(politician => {
        return res.json(politician)
        }).catch(err => res.status(400).json('Politicians not found'))
}

module.exports = {
    handleSearchTerm    
}