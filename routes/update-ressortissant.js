const DB = require("../connection_bdd");
module.exports = (req, res) => {
    
    const data = req.body;
    //lastModification = Date();
    if(!req.file){

        let sqlInserte = `UPDATE ressortissants SET nom=?, postnom=?, prenom=?, telephone=?, currentAdresse=?, dateDeNaissance=?, lieuDeNaissance=?, id_sexe=?, id_etatCivil=?, nbEnfant=?, profession=?, id_province=?, dmicileEnRDC=?, nomDuPere=?, nomDeLaMere=?, cinRDC=?, cinMaroc=?, id_statut=?, dateEntree=?, dateSortie=?, lastModification=UTC_TIMESTAMP WHERE passeport=?`; 
        DB.query(sqlInserte, [data.nom, data.postnom, data.prenom, data.telephone, data.currentAdresse, data.dateDeNaissance, data.lieuDeNaissance, parseInt(data.sexe), parseInt(data.etatCivil),  parseInt(data.nbEnfant), data.profession, parseInt(data.province), data.dmicileEnRDC, data.nomDuPere,  data.nomDeLaMere, data.cinRDC, data.cinMaroc, parseInt(data.statut),  data.dateEntree, data.dateSortie, data.passeport], (err, result) => {
            if(err){
                throw err;
            }
            res.json(result);
        });

    }else{

        let url_photo = `/uploads/${req.file.filename}`;
        let sqlInserte = `UPDATE ressortissants SET nom=?, postnom=?, prenom=?, telephone=?, currentAdresse=?, dateDeNaissance=?, lieuDeNaissance=?, id_sexe=?, id_etatCivil=?, nbEnfant=?, profession=?, id_province=?, dmicileEnRDC=?, nomDuPere=?, nomDeLaMere=?, cinRDC=?, cinMaroc=?, id_statut=?, dateEntree=?, dateSortie=?, photo=?, lastModification=UTC_TIMESTAMP WHERE passeport=?`; 
        DB.query(sqlInserte, [data.nom, data.postnom, data.prenom, data.telephone, data.currentAdresse, data.dateDeNaissance, data.lieuDeNaissance, parseInt(data.sexe), parseInt(data.etatCivil),  parseInt(data.nbEnfant), data.profession, parseInt(data.province), data.dmicileEnRDC, data.nomDuPere,  data.nomDeLaMere, data.cinRDC, data.cinMaroc, parseInt(data.statut),  data.dateEntree, data.dateSortie, url_photo, data.passeport], (err, result) => {
            if(err){
                throw err;
            }
            res.json(result);
        });

    }

}