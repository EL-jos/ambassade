const DB = require("../connection_bdd");
const path = require('path');

module.exports = async (req, res) => {

    let data = req.params;
    let response = await getDocument(data.passeport, parseInt(data.categorie_document));

    if(response){
        const file = path.join(__dirname, '..', `${response.url}`);
        res.download(file);
    }else{
        res.redirect('/mon-compte/?t=' + 0);
    }
}

function getDocument(proprietaire, categorie){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT url FROM documentsressortissants WHERE proprietaire=? AND id_categorie=?";
        DB.query(sql,[proprietaire, categorie], (err, result)=>{
            if (err) {
                reject();
            } else {
                resolve(result[0]);
            }
        });
    });

    return promise
}

