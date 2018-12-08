const handleLoadUserIcons = (req, res, db) => {
    // need to change this for security reasons
    const { email } = req.body;
    console.log('req.body', req.body);
    db('photos')  
        .where('email', '=', email)
        .select('link')
        .limit(10)
        .bind(console)
        .then(links => {
        console.log('links', links);
        res.json(links)
        }).catch(err => res.status(400).json('Photos not received from database'))
}

module.exports = {
    handleLoadUserIcons
    }