const handleLoadUserIcons = (req, res, db) => {
    // need to change this for security reasons
    // change limit 10 to extend the amount of previous photos visible
    const { email } = req.body;
    db('photos')  
        .where('email', '=', email)
        .select('link', 'place')
        .limit(10)
        .bind(console)
        .then(links => {
        return res.json(links)
        }).catch(err => res.status(400).json('Photos not received from database'))
}

module.exports = {
    handleLoadUserIcons
    }