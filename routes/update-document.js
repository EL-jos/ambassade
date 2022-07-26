const DB = require("../connection_bdd");
module.exports = (req, res) => {
    
    const data = req.body;
    //lastModification = Date();
    if(!req.file){

        let sqlInserte = `UPDATE documentsressortissants SET proprietaire=?, expiration=?, id_categorie=? WHERE creation=?`; 
        DB.query(sqlInserte, [data.proprietaire, data.expiration, parseInt(data.categorie), data.creation], (err, result) => {
            if(err){
                throw err;
            }
            res.json(result);
        });

    }

}