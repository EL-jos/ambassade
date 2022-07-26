const DB = require("../connection_bdd");

module.exports = (req, res) => {

    let sql = "SELECT * FROM conversations WHERE expediteur=? OR destinataire=?";
    DB.query(sql,[ req.body.correspondant, req.body.correspondant ], (err, result)=>{
        if(err){
            throw err;
        }

        res.json(result);
    });
}