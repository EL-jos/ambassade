const DB = require("../connection_bdd");

module.exports = async (req, res) => {
    let sexes = await getSexes();
    let etatCivils = await getEtatCivils();
    let provinces = await getProvinces();
    let categorieDocuments = await getCategorieDocuments();

    let ressortissant = req.session.ressortissant;
    let passeport = ressortissant.passeport.trim();
    let conversations = await getAllConversationOf(passeport);
    
    res.render('mon-compte', {
        sexes: sexes,
        etatCivils: etatCivils,
        provinces: provinces,
        categorieDocuments: categorieDocuments,
        conversations: conversations,
    });
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

function getAllConversationOf(passeport){
    var promise = new Promise( function(resolve, reject) {
        let sql = "SELECT * FROM conversations WHERE expediteur=? OR destinataire=?";
        DB.query(sql, [passeport, passeport], (err, result)=>{
            if (err) {
                reject();
            } else {
                resolve(result);
            }
        });
    });

    return promise
}