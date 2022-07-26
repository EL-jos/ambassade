const DB = require("../connection_bdd");

module.exports = async (req, res) => {

    let data = req.body
    console.log(data);
    let response = await createMessage("ambassade", data.destinataire, data.contenu);

    res.json(response);
    
}

function createMessage(expediteur, destinataire, contenu){
    var promise = new Promise( function(resolve, reject) {
        let sql = "INSERT INTO conversations (envoie, expediteur, destinataire, contenu) VALUES (UTC_TIMESTAMP,?,?,?)";
        DB.query(sql, [expediteur, destinataire, contenu], (err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}

function getAllConversationOf(passeport){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT * FROM conversations WHERE expediteur=? OR destinataire=?";
        DB.query(sql, [passeport, passeport], (err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}
