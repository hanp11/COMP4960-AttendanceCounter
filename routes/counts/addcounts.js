const fs = require('fs');

module.exports = {
    addCountsPage: (req, res) => {
        let query = "SELECT * FROM `room`"; // query database to get all the Rooms
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        res.render('addcounts.ejs', {
            title: "Add Room"
            ,message: ''
            ,room: result
            });
        });
    },

    addCounts: (req, res) => {

        let message = '';
        let room_name = req.body.room_name;
        let capactity = req.body.capacity_id;

        let existingRoomQuery = "SELECT * FROM `room` WHERE RoomName = '" + room_name + "'";

        db.query(existingRoomQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Room Name already exists';
                res.render('addcounts.ejs', {
                    message,
                    title: "Add Room"
                });
                
            } else {
                // send the room's details to the database
                let query = "INSERT INTO `room` (RoomName, Capacity) VALUES ('" +
                    room_name + "', '" + capactity +"')";
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
                        ,message: 'Room Added'
                        ,room: result
                        });
                    });
                });
                    
            }
        });
    },

};