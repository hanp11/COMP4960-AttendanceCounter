const fs = require('fs');

module.exports = {
    deleteSessionPage: (req, res) => {

        let query = "SELECT * FROM `Session`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('deletesession.ejs', {
                title: "Delete Session"
                ,session: result
                ,message: ''
            });
        });
    },

    deleteSession: (req, res) => {
        let title_id = req.body.session_dropdown;
        // console.log(RoomId);
        let deleteSessionQuery = 'DELETE FROM session WHERE Title = "' + title_id + '"';

            db.query(deleteSessionQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let query = "SELECT * FROM `Session`";
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('deletesession.ejs', {
                        title: "Delete Session"
                        ,session: result
                        ,message: 'Session Deleted'
                    });
                });
            });

    }
};