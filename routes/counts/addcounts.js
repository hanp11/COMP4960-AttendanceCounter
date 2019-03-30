const fs = require('fs');

module.exports = {
    addCountsPage: (req, res) => {
        let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('addcounts.ejs', {
                title: "Add Counts"
                , message: ''
                , room: result[0]
                , speaker: result[1]
                , time: result[2]
                , session: result[3]
            });
        });
    },

    addCounts: (req, res) => {

        let message = '';
        let session_name = req.body.session_dropdown;
        let start_count = req.body.start-count;
        let middle_count = req.body.start-count;
        let final_count = req.body.end_count;

        let existingRoomQuery = "SELECT * FROM `room` WHERE RoomName = '" + room_name + "'";

        db.query(existingRoomQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Room Name already exists';
                res.render('addcounts.ejs', {
                    message,
                    title: "Add Count"
                });

            } else {
                // send the room's details to the database
                let query = "INSERT INTO `counts` (SessionID, StartCount, MidCount, FinalCount) VALUES ('" +
                    session_name + "', '" + start_count + "', '" + middle_count + "', '" + final_count + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // res.redirect('/');
                    query = "SELECT * FROM `room`"; // query database to get all the Rooms
                    // execute query
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('addcounts.ejs', {
                            title: "Add Room"
                            , message: 'Room Added'
                            , room: result
                        });
                    });
                });

            }
        });
    },

};