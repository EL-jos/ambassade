module.exports = (req, res, next) =>{
    if(req.session.ressortissant){
        return res.redirect('/') // if user logged in, redirect to home page
    }
    next()
}