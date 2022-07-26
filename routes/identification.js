const DB = require("../connection_bdd");

module.exports = async (req, res) => {

    let sexes = await getSexes();
    let etatCivils = await getEtatCivils();
    let provinces = await getProvinces();

    res.render('identification', {
        sexes: sexes,
        etatCivils: etatCivils,
        provinces: provinces,
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