const handleAddPolitician = (req, res, db) => {
    const { name, age, job, info, party, link, lat, lng, contact, id } = req.body;
    if (!contact || !name || !id) {
        return  res.status(400).json('One of the fields is empty')
    }
        db('politicians')
          .insert({
                name: username,
                age: email,
                job: hash,
                info: info,
                party: party,
                link: link,
                lat: lat,
                lng: lng,
                contact: contact,
                id: id,
          })
          .returning('id')
          .then(response => {
            res.json(response);
        }).catch(err => res.status(400).json('Unable to add politician')) 
}

module.exports = {
    handleAddPolitician
    }