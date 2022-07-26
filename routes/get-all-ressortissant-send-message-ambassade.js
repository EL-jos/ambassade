const DB = require("../connection_bdd");

module.exports = (req, res) => {
    let sql = `SELECT CO.*, CONCAT('http://localhost:4000',RE.photo) AS photo, CONCAT(RE.nom, ' ', RE.postnom, ' ', RE.prenom) AS nom_expediteur
    FROM conversations AS CO 
    INNER JOIN ressortissants RE ON RE.passeport=CO.expediteur
    WHERE destinataire='ambassade' OR expediteur='ambassade' GROUP BY expediteur`;
    DB.query(sql,(err, result)=>{
        if(err){
            throw err;
        }

        res.json(result);
    });
}