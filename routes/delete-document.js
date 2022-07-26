const DB = require("../connection_bdd");
const path = require('path');
const fs = require('fs');
module.exports = (req, res) => {

    const data = req.body;
    url_photo = path.join(__dirname, '..', `${data.url}`);

    let sqlInserte = `DELETE FROM documentsressortissants WHERE creation=? AND proprietaire=?`;

    DB.query(sqlInserte, [data.creation, data.proprietaire], (err, result) => {
        if(err){
            throw err;
        }

        if(result.affectedRows){

            if(fs.existsSync(url_photo)){
    
                fs.unlink(url_photo, (err) => {
                    if(err){
                        throw err;
                    }
                    result.message = "Suppression du ressortissant réussi";
                    res.json(result);
                });
            }else{
                res.json({"affectedRows": 1, "message": "Une erreur est survenu lors de la suppression"});
            }
        }else{
            
            result.message = "Une erreur se produite loras de la suppression";
            res.json(result);
        }

    });
    
}