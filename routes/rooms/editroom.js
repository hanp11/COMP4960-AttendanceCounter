const fs = require('fs');

module.exports = {
    editRoomPage: (req, res) => {

        let query = "SELECT * FROM `room`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('editroom.ejs', {
                title: "Edit Room"
                ,room: result
                ,message: ''
            });
        });
    },
    editRoom: (req, res) => {
        let old_room_name = req.body.room_dropdown;
        let room_name = req.body.room_name;
        let capactity = req.body.capacity_id;

        let existingRoomQuery = "SELECT * FROM `room` WHERE RoomName = '" + room_name + "'";
        if(old_room_name == room_name){
            let query = "UPDATE Room SET RoomName = '" + room_name + "', Capacity = " + capactity + " WHERE RoomName = '" + old_room_name + "'";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        query = "SELECT * FROM `room`"; // query database to get all the Rooms
                        // execute query
                        db.query(query, (err, result) => {
                            if (err) {
                                res.redirect('/');
                            }
                        res.render('editroom.ejs', {
                            title: "Edit Room"
                            ,message: 'Room Edited'
                            ,room: result
                            });
                        });
                    });
        }
        else{
            db.query(existingRoomQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    let query = "SELECT * FROM `room`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('editroom.ejs', {
                            title: "Edit Room"
                            ,room: result
                            ,message: 'Room Name already exists'
                        });
                    });
                    
                } else {
                    // send the room's details to the database
                    let query = "UPDATE Room SET RoomName = '" + room_name + "', Capacity = " + capactity + " WHERE RoomName = '" + old_room_name + "'";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        query = "SELECT * FROM `room`"; // query database to get all the Rooms
                        // execute query
                        db.query(query, (err, result) => {
                            if (err) {
                                res.redirect('/');
                            }
                        res.render('editroom.ejs', {
                            title: "Edit Room"
                            ,message: 'Room Edited'
                            ,room: result
                            });
                        });
                    });
                        
                }
            });
        }

        
    }
};