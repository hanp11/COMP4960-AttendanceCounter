const fs = require('fs');

module.exports = {
    deleteRoomPage: (req, res) => {

        let query = "SELECT * FROM `room`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('deleteroom.ejs', {
                title: "Delete Room"
                ,room: result
                ,message: ''
            });
        });
    },

    deleteRoom: (req, res) => {
        let RoomId = req.body.room_dropdown;
        console.log(RoomId);
        let deleteRoomQuery = 'DELETE FROM room WHERE RoomName = "' + RoomId + '"';

            db.query(deleteRoomQuery, (err, result) => {
                if (err) {
                    let query = "SELECT * FROM `room`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('deleteroom.ejs', {
                            title: "Delete Room"
                            ,room: result
                            ,message: 'Error, Room is being used by a Session'
                        });
                    });
                }
                let query = "SELECT * FROM `room`"; // query database to get all the Rooms
                // execute query
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                res.render('deleteroom.ejs', {
                    title: "Delete Room"
                    ,message: 'Room Deleted'
                    ,room: result
                    });
                });
            });

    }
};