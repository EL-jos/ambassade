const DB = require("../connection_bdd");

module.exports = (req, res) => {
    req.session.destroy();
    res.redirect('/?d=' + 1)
}
