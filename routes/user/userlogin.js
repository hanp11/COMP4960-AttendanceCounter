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

        let daily_password = JSON.stringify(jsoncontents.daily_password);

        if(password == daily_password){
            res.redirect('/index.ejs');
        }
        else{
            console.log('not working');
        }
    },
};