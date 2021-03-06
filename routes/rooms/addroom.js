const fs = require('fs');

module.exports = {
    addRoomPage: (req, res) => {
        let query = "SELECT * FROM `room`"; // query database to get all the Rooms
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        res.render('addroom.ejs', {
            title: "Add Room"
            ,message: ''
            ,room: result
            });
        });
    },

    addRoom: (req, res) => {

        let message = '';
        let room_name = req.body.room_name;
        let capacity = 0;

        if (req.body.capacity_id.trim()) {
            // is empty or whitespace
            capacity = req.body.capacity_id;
        }

        let existingRoomQuery = "SELECT * FROM `room` WHERE RoomName = '" + room_name + "'";

        db.query(existingRoomQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Room Name already exists';
                res.render('addroom.ejs', {
                    message,
                    title: "Add Room"
                });
                
            } else {
                // send the room's details to the database
                let query = "INSERT INTO `room` (RoomName, Capacity) VALUES ('" +
                    room_name + "', '" + capacity +"')";
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
                    res.render('addroom.ejs', {
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