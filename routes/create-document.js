const DB = require("../connection_bdd");
const path = require('path');
//path.join(__dirname, '..', 'uploads', `${req.file.filename}`);
module.exports = (req, res) => {

    if(req.file){
        const data = req.body;
        
        url_document = `/uploads/${req.file.filename}`;

        let sqlInserte = `INSERT INTO documentsressortissants (creation, expiration, proprietaire, titre, url, id_categorie) VALUES (UTC_TIMESTAMP, ?, ?, ?, ?, ?)`;
        DB.query(sqlInserte, [ data.dateDExpiration, data.proprietaire, data.title, url_document, parseInt(data.id_categorie)], (err, result) => {
            if(err){
                throw err;
            }
            res.json(result);
        });
    }else{
        res.json({"affectedRows": 0, "message": "Impossible d'enregistrer un ressortissant sans sa photo"});
    }
}