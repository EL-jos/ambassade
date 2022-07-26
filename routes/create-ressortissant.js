const DB = require("../connection_bdd");
const path = require('path');
//path.join(__dirname, '..', 'uploads', `${req.file.filename}`);
module.exports = (req, res) => {

    if(req.file){
        const data = req.body;
        url_photo = `/uploads/${req.file.filename}`;
        let sqlInserte = `INSERT INTO ressortissants (nom, postnom, prenom, telephone, currentAdresse, dateDeNaissance, lieuDeNaissance, id_sexe, id_etatCivil, nbEnfant, profession, id_province, dmicileEnRDC, nomDuPere, nomDeLaMere, passeport, cinRDC, cinMaroc, id_statut, dateEntree, dateSortie, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        DB.query(sqlInserte, [data.nom, data.postnom, data.prenom, data.telephone, data.currentAdresse, data.dateDeNaissance, data.lieuDeNaissance, parseInt(data.sexe), parseInt(data.etatCivil),  parseInt(data.nbEnfant), data.profession, parseInt(data.province), data.dmicileEnRDC, data.nomDuPere,  data.nomDeLaMere, data.passeport, data.cinRDC, data.cinMaroc, parseInt(data.statut),  data.dateEntree, data.dateSortie, url_photo], (err, result) => {
            if(err){
                throw err;
            }
            res.json(result);
        });
    }else{
        res.json({"affectedRows": 0, "message": "Impossible d'enregistrer un ressortissant sans sa photo"});
    }
}