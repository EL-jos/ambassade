const path = require('path');

module.exports = (req,res)=>{
    const filepath = path.join(__dirname,".." ,'uploads', `${req.params["name_file"]}`);
    res.sendFile(filepath)
}