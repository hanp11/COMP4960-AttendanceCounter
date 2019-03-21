const fs = require('fs');

module.exports = {
    deleteSpeakerPage: (req, res) => {

        let query = "SELECT * FROM `Speaker`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('deletespeaker.ejs', {
                title: "Delete Room"
                ,speaker: result
                ,message: ''
            });
        });
    },

    deleteSpeaker: (req, res) => {
        let email_id = req.body.speaker_dropdown;
        // console.log(RoomId);
        let deleteSpeakerQuery = 'DELETE FROM speaker WHERE Email = "' + email_id + '"';

            db.query(deleteSpeakerQuery, (err, result) => {
                if (err) {
                    let query = "SELECT * FROM `Speaker`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('deletespeaker.ejs', {
                            title: "Delete Room"
                            ,speaker: result
                            ,message: 'Error, Speaker is being used by a Session'
                        });
                    });
                }
                let query = "SELECT * FROM `Speaker`";
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('deletespeaker.ejs', {
                        title: "Delete Room"
                        ,speaker: result
                        ,message: 'Speaker Deleted'
                    });
                });
            });

    }
};