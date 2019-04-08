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

            
            var fileName = './username.json';
            var file = require(fileName);

            file.key = username;

        fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
            console.log(JSON.stringify(file, null, 2));
            console.log('writing to ' + fileName);
            });

            res.redirect('/addcounts');
        }
        else{
            res.redirect('/');
        }
    },
};