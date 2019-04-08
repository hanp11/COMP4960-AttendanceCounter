const fs = require('fs');

module.exports = {
    viewCountsSpeakerPage: (req, res) => {
        let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            else {
            }
            res.render('viewcounts_speaker.ejs', {
                title: "View Counts"
                , message: ''
                , room: result[0]
                , speaker: result[1]
                , timepoint: result[2]
                , session: result[3]
            });
        });
    },

    viewCountsSpeaker: (req, res) => {
    },
};