const DB = require("../connection_bdd");
const path = require('path');
const fs = require('fs');
module.exports = (req, res) => {

    const passeport = req.body.passeport;
    url_photo = path.join(__dirname, '..', `${req.body.photo}`);

    let sqlInserte = `DELETE FROM ressortissants WHERE passeport=?`;

    DB.query(sqlInserte, [passeport], (err, result) => {
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
        }

        result.message = "Une erreur se produite loras de la suppression";
        res.json(result);
    });
    
}