const DB = require("../connection_bdd");
module.exports = (req, res) => {

    let sqlInserte = `SELECT Doc.*, RE.passeport AS proprietaire_passeport, CONCAT(RE.nom, " ", RE.postnom, " ", RE.prenom) AS proprietaire_nom, RE.photo AS photo_proprietaire, CD.name AS nom_categorie 
    FROM documentsressortissants DOC INNER JOIN ressortissants RE ON RE.passeport = DOC.proprietaire 
    INNER JOIN categoriedocuments CD ON CD.id = DOC.id_categorie`;
    DB.query(sqlInserte, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);
    });

}