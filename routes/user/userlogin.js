const fs = require('fs');

var contents1 = fs.readFileSync("daily-password.json");
var jsoncontents1 = JSON.parse(contents1);

var contents2 = fs.readFileSync("admin-password.json");
var jsoncontents2 = JSON.parse(contents2);


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

        if(password == jsoncontents1.daily_password){
            
            var fileName = './username.json';
            var file = require(fileName);
            file.name = username;

            fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
            if (err) return console.log(err);
                });

            res.redirect('/addcounts');
        }else if(password == jsoncontents2.admin_password){
            res.redirect('/index');
        }else{
            //need to add wrong password message
            res.redirect('/');
        }
    },
};
