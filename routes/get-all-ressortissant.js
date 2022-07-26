const DB = require("../connection_bdd");
module.exports = (req, res) => {

    let sqlInserte = `SELECT RE.*, PR.name AS nom_province, ET.name AS nom_etatCivil, SE.name AS nom_sexe, ST.name AS nom_statut
    FROM ressortissants RE 
    INNER JOIN provinces PR ON PR.id = RE.id_province
    INNER JOIN etatCivils ET ON ET.id = RE.id_etatCivil
    INNER JOIN sexes SE ON SE.id = RE.id_sexe
    INNER JOIN statuts ST ON ST.id = RE.id_statut`;
    DB.query(sqlInserte, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);
    });

}