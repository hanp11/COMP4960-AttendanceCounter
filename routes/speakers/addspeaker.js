const fs = require('fs');

module.exports = {
    addSpeakerPage: (req, res) => {
        let query = "SELECT * FROM `speaker`"; // query database to get all the Rooms
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        res.render('addspeaker.ejs', {
            title: "Add Speaker"
            ,message: ''
            ,speaker: result
            });
        });
    },

    addSpeaker: (req, res) => {

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;

        let existingSpeakerQuery = "SELECT * FROM `speaker` WHERE Email = '" + email + "'";

        db.query(existingSpeakerQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Speaker already exists';
                res.render('addspeaker.ejs', {
                    message,
                    title: "Add Speaker"
                });
            } else {
                // send the room's details to the database
                let query = "INSERT INTO `speaker` (FirstName, LastName, Email) VALUES ('" +
                    first_name + "', '" + last_name + "', '"+email +"')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    query = "SELECT * FROM `speaker`"; // query database to get all the Rooms
                    // execute query
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                    res.render('addspeaker.ejs', {
                        title: "Add Speaker"
                        ,message: 'Speaker Added'
                        ,speaker: result
                        });
                    });
                });
                    
            }
        });
    },

};