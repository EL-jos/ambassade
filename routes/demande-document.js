const DB = require("../connection_bdd");

module.exports = async (req, res) => {

    let data = req.params;
    let date = new Date().toUTCString();
    let response = await insertToDemadeDocument(date, parseInt(data.categorie_document));
    if(response.affectedRows){
        response = await insertToRessorisantDemandeDocument(date, data.passeport)
        if(response.affectedRows){
            res.redirect('/mon-compte/?r=' + 1);
        }
    }
}

function insertToDemadeDocument(date, categorie){
    var promise = new Promise( function(resolve, reject) {
        let sql = "INSERT INTO demadedocument (dateDeLaDemande, categorieDocument) VALUES (?,?)";
        DB.query(sql,[date, categorie], (err, result)=>{
            if (err) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}

function insertToRessorisantDemandeDocument(date, passeport){
    var promise = new Promise( function(resolve, reject) {
        let sql = "INSERT INTO ressorisant_demande_document (dateDeLaDemande, passeport) VALUES (?,?)";
        DB.query(sql,[date, passeport], (err, result)=>{
            if (err) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}
