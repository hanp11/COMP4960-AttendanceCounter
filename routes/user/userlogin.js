const fs = require('fs');

var contents = fs.readFileSync("daily-password.json");
var jsoncontents = JSON.parse(contents);


module.exports = {
    userLoginPage: (req, res) => {
        res.render('userlogin.ejs', {
            title: "Add Room"
            });
    },

    userLogin: (req, res) => {

        let message = '';
        let username = req.body.username;
        let password = req.body.password;

        if(password == jsoncontents.daily_password){
            res.redirect('/addcounts');
        }
        else{
            res.redirect('/');
        }
    },
};