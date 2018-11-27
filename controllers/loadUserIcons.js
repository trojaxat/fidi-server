const handleLoadUserIcons = (req, res, db) => {
    // need to change this for security reasons
    const { email } = req.body;
    db('photos')  
        .where('email', '=', email)
        .select('link')
        .limit(10)
        .bind(console)
        .then(links => {
        res.json(links)
        }).catch(err => res.status(400).json('Photos not received from database'))
}

module.exports {
    handleLoadUserIcons: handleLoadUserIcons
    }