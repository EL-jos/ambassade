module.exports = async (req, res) => {

    if(req.session.ressortissant){
        res.render('index', {ressortissant});
    }else{
        res.render('index');
    }
}