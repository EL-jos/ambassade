const DB = require("../connection_bdd");

module.exports = async (req, res) => {

    let data = req.body;
    let ressortissant = await connexion(data.passeport);
    if(ressortissant === ""){
        res.render("identification",{
            erreur: {message: "Aucunne informations trouvées avec cet identifiant saisie", code: 1}
        });
    }else{
        
        req.session.ressortissant = ressortissant[0];
        res.redirect('/mon-compte/?c=' + 1);
    }
}


function connexion(passeport){
    var promise = new Promise( function(resolve, reject) {
        let sql = `SELECT RE.*, PR.name AS nom_province, ET.name AS nom_etatCivil, SE.name AS nom_sexe, ST.name AS nom_statut
        FROM ressortissants RE 
        INNER JOIN provinces PR ON PR.id = RE.id_province
        INNER JOIN etatCivils ET ON ET.id = RE.id_etatCivil
        INNER JOIN sexes SE ON SE.id = RE.id_sexe
        INNER JOIN statuts ST ON ST.id = RE.id_statut
        WHERE RE.passeport=?`;
        DB.query(sql, [passeport], (err, result)=>{
            if (err) {
                reject();
            }else if(result.length === 0){
                resolve("")
            }else {
                resolve(result);
            }
        });
    });

    return promise
}
