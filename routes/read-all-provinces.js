const DB = require("../connection_bdd");

module.exports = async (req, res) => {
    let sql = "SELECT id,name FROM provinces ORDER BY id ASC";
    let response = await DB.query(sql);
    res.json(response.rows);
}