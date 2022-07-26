const DB = require("../connection_bdd");

module.exports = (req, res) => {
    let sql = "SELECT id,name FROM etatcivils ORDER BY id ASC";
    DB.query(sql,(err, result)=>{
        if(err){
            throw err;
        }

        res.json(result);
    });
}