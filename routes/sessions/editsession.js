const fs = require('fs');

module.exports = {
    editSessionPage: (req, res) => {

        let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('editsession.ejs', {
                title: "Edit Session"
                ,message: ''
                ,room: result[0]
                ,speaker: result[1]
                ,time: result[2]
                ,session: result[3]
            });
        });
    },
    editSession: (req, res) => {

        let old_title = req.body.session_dropdown;
        console.log(old_title);
        let new_title = req.body.session_name;
        console.log(new_title);
        let room_name = req.body.room_dropdown;
        let email = req.body.speaker_dropdown;
        let existing_time = req.body.exisiting_time_dropdown;
        
        existing_time = existing_time.split("-");
        existing_time_start = existing_time[0];
        existing_time_start = existing_time_start.split(":")
        existing_time_end = existing_time[1];
        existing_time_end = existing_time_end.split(":")

        let exisiting_start_hour = existing_time_start[0];
        let exisiting_start_minute = existing_time_start[1];
        let exisiting_start_am_pm = existing_time_start[3];
        let exisiting_end_hour = existing_time_end[0];
        let exisiting_end_minute = existing_time_end[1];
        let exisiting_end_am_pm = existing_time_end[3];
    
        if(exisiting_start_am_pm == 'PM'){
            exisiting_start_hour = parseInt(exisiting_start_hour) + 12;
        }

        if(exisiting_end_am_pm == 'PM'){
            exisiting_end_hour = parseInt(exisiting_end_hour) + 12;
        }
        let start_time = exisiting_start_hour+":"+exisiting_start_minute+":00";
        let end_time = exisiting_end_hour+":"+exisiting_end_minute+":00";

        let KeyQuery = "SELECT RoomID FROM `room` WHERE RoomName = '" + room_name + "';SELECT SpeakerID FROM `Speaker` WHERE Email = '" + email + "';SELECT TimePointID FROM `timepoint` WHERE TimePoint_Start = '" + start_time + "' AND TimePoint_End = '" + end_time + "';";
        db.query(KeyQuery, [1, 2], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else{
                let RoomId = JSON.stringify(result[0]).split(":")[1].split("}")[0];
                let SpeakerID = JSON.stringify(result[1]).split(":")[1].split("}")[0];
                let TimePointID = JSON.stringify(result[2]).split(":")[1].split("}")[0];
                 //
                if(old_title == new_title){
                    let sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                    console.log(sameTitleQuery)   
                    db.query(sameTitleQuery, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms

                            // execute query
                            db.query(query, [1, 2], (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('editsession.ejs', {
                                    title: "Edit Session"
                                    ,message: 'Session Edited'
                                    ,room: result[0]
                                    ,speaker: result[1]
                                    ,time: result[2]
                                    ,session: result[3]
                                });
                            });
                        });
                }
                //
                let existingSessionQuery =  "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '"+SpeakerID+"' AND TimePointID = '"+TimePointID+"' AND Title = '"+new_title+"'";
                db.query(existingSessionQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        let redirectQuery = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms
                        // execute query
                        db.query(redirectQuery, [1, 2], (err, result) => {
                            if (err) {
                                res.redirect('/');
                            }
                            res.render('editsession.ejs', {
                                title: "Edit Session"
                                ,message: 'Session already exists'
                                ,room: result[0]
                                ,speaker: result[1]
                                ,time: result[2]
                                ,session: result[3]
                                
                            });
                        });
                    } else {
                        // send the room's details to the database
                        let query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                        console.log(query)
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`"; // query database to get all the Rooms

                            // execute query
                            db.query(query, [1, 2], (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('editsession.ejs', {
                                    title: "Edit Session"
                                    ,message: 'Session Edited'
                                    ,room: result[0]
                                    ,speaker: result[1]
                                    ,time: result[2]
                                    ,session: result[3]
                                });
                            });
                        });
                            
                }
            });
        }
    });
    }
}