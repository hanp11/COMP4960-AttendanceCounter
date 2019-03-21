const fs = require('fs');

module.exports = {
    editSpeakerPage: (req, res) => {

        let query = "SELECT * FROM `speaker`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('editspeaker.ejs', {
                title: "Edit Room"
                ,speaker: result
                ,message: ''
            });
        });
    },
    editSpeaker: (req, res) => {
        let email_key = req.body.speaker_dropdown;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        console.log(email)
        console.log(email_key)

        let existingSpeakerQuery = "SELECT * FROM `Speaker` WHERE Email = '" + email + "'";
        if(email_key == email){
            let query = "UPDATE Speaker SET FirstName = '" + first_name + "', LastName = '" + last_name + "', Email = '" + email + "' WHERE Email = '" + email_key + "'";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        query = "SELECT * FROM `speaker`";
                        db.query(query, (err, result) => {
                            if (err) {
                                res.redirect('/');
                            }
                            res.render('editspeaker.ejs', {
                                title: "Edit Room"
                                ,speaker: result
                                ,message: 'Room Edited'
                            });
                        });
                    });
        }
        else{
            db.query(existingSpeakerQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    let query = "SELECT * FROM `speaker`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('editspeaker.ejs', {
                            title: "Edit Room"
                            ,speaker: result
                            ,message: 'Speaker Email already exists'
                        });
                    });
                    
                } else {
                    // send the room's details to the database
                    let query = "UPDATE Speaker SET FirstName = '" + first_name + "', LastName = '" + last_name + "', Email = '" + email + "' WHERE Email = '" + email_key + "'";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        query = "SELECT * FROM `speaker`";
                        db.query(query, (err, result) => {
                            if (err) {
                                res.redirect('/');
                            }
                            res.render('editspeaker.ejs', {
                                title: "Edit Room"
                                ,speaker: result
                                ,message: 'Room Edited'
                            });
                        });
                    });
                        
                }
            });
        }
        
        
    }
};