const DB = require("../connection_bdd");

module.exports = async (req, res) => {

    let data = req.body;
    let expediteur = data.expediteur.trim();
    let response = await createMessage(expediteur,'ambassade',data.contenu);

    if(response.affectedRows){

        conversations = await getAllConversationOf(expediteur);
        
        let sexes = await getSexes();
        let etatCivils = await getEtatCivils();
        let provinces = await getProvinces();
        let categorieDocuments = await getCategorieDocuments();

        res.render('mon-compte',
            {
                conversations: conversations,
                send: 1,
                sexes: sexes,
                etatCivils: etatCivils,
                provinces: provinces,
                categorieDocuments: categorieDocuments,
            }
        );

    }else{
        res.redirect('/mon-compte/?s=' + 0);
    }
    
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

function getSexes(){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT id, name FROM sexes ORDER BY id ASC";
        DB.query(sql,(err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}

function getEtatCivils(){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT id,name FROM etatcivils ORDER BY id ASC";
        DB.query(sql,(err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}

function getProvinces(){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT id,name FROM provinces ORDER BY id ASC";
        DB.query(sql,(err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}

function getCategorieDocuments(){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT id, name FROM categoriedocuments ORDER BY id ASC";
        DB.query(sql,(err, result)=>{
            if (err || result.length === 0) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}