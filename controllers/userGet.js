const handleUserGet = (req, res) => {
    const { username } = req.params;
    db.select('*').from('users').where({username})
        .then(response => {
         res.send(response[0])
    })
}
    
module.exports = {
    handleUserGet
    }