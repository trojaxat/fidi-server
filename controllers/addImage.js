const addImage = (req, res, db) => {
    const { email, link, place } = req.body;
    db('photos')  
        .where('email', '=', email)
        .insert({link: link, email: email, place: place})
        .then(response => response)
    db('photos')      
        .select('link')
        .where('place', '=', place)
        .then(link => {
        res.json(link[0])
        }).catch(err => res.status(400).json('Photos not added'))
})

module.exports = {
    handleAddImage: handleAddImage
    }