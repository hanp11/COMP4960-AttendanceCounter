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

        let KeyQuery = "SELECT RoomID FROM `room` WHERE RoomName = '" + room_name + "';SELECT TimePointID FROM `timepoint` WHERE TimePoint_Start = '" + start_time + "' AND TimePoint_End = '" + end_time + "';";

        var len = 0;
        if (email.constructor == Array) {
            for (var i = 0; i < email.length; i++) {
                if (email[i] !== undefined) {
                    len++;
                }
            }

            for (var j = 0; j < len; j++) {
                KeyQuery += "SELECT SpeakerID FROM`Speaker` WHERE Email = '" + email[j] + "';";
            }
        }
        else {
            KeyQuery += "SELECT SpeakerID FROM`Speaker` WHERE Email = '" + email + "';";
        }

        db.query(KeyQuery, [1, 2], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else{
                let RoomId = JSON.stringify(result[0]).split(":")[1].split("}")[0];
                let TimePointID = JSON.stringify(result[1]).split(":")[1].split("}")[0];
                let SpeakerID = JSON.stringify(result[2]).split(":")[1].split("}")[0];
                let SpeakerID2 = "";
                let SpeakerID3 = "";
                let SpeakerID4 = "";
                let SpeakerID5 = "";
                let sameTitleQuery = "";

                if (old_title == new_title) {
                    switch (len) {
                        case 2:
                            SpeakerID2 = JSON.stringify(result[3]).split(":")[1].split("}")[0];
                            sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                            break;
                        case 3:
                            SpeakerID2 = JSON.stringify(result[3]).split(":")[1].split("}")[0];
                            SpeakerID3 = JSON.stringify(result[4]).split(":")[1].split("}")[0];
                            sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                            break;
                        case 4:
                            SpeakerID2 = JSON.stringify(result[3]).split(":")[1].split("}")[0];
                            SpeakerID3 = JSON.stringify(result[4]).split(":")[1].split("}")[0];
                            SpeakerID4 = JSON.stringify(result[5]).split(":")[1].split("}")[0];
                            sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', SpeakerID4 = '" + SpeakerID4 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                            break;
                        case 5:
                            SpeakerID2 = JSON.stringify(result[3]).split(":")[1].split("}")[0];
                            SpeakerID3 = JSON.stringify(result[4]).split(":")[1].split("}")[0];
                            SpeakerID4 = JSON.stringify(result[5]).split(":")[1].split("}")[0];
                            SpeakerID5 = JSON.stringify(result[6]).split(":")[1].split("}")[0];
                            sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', SpeakerID4 = '" + SpeakerID4 + "', SpeakerID5 = '" + SpeakerID5 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                            break;
                        default:
                            sameTitleQuery = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                    }
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
                
                let existingSessionQuery = "";
                switch (len) {
                    case 2:
                        existingSessionQuery = "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '" + SpeakerID + "' AND SpeakerID2 = '" + SpeakerID2 + "' AND TimePointID = '" + TimePointID + "' AND Title = '" + new_title + "'";
                        break;
                    case 3:
                        existingSessionQuery = "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '" + SpeakerID + "' AND SpeakerID2 = '" + SpeakerID2 + "' AND SpeakerID3 = '" + SpeakerID3 + "' AND TimePointID = '" + TimePointID + "' AND Title = '" + new_title + "'";
                        break;
                    case 4:
                        existingSessionQuery = "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '" + SpeakerID + "' AND SpeakerID2 = '" + SpeakerID2 + "' AND SpeakerID3 = '" + SpeakerID3 + "' AND SpeakerID4 = '" + SpeakerID4 + "' AND TimePointID = '" + TimePointID + "' AND Title = '" + new_title + "'";
                        break;
                    case 5:
                        existingSessionQuery = "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '" + SpeakerID + "' AND SpeakerID2 = '" + SpeakerID2 + "' AND SpeakerID3 = '" + SpeakerID3 + "' AND SpeakerID4 = '" + SpeakerID4 + "' AND SpeakerID5 = '" + SpeakerID5 + "' AND TimePointID = '" + TimePointID + "' AND Title = '" + new_title + "'";
                        break;
                    default:
                        existingSessionQuery = "SELECT * FROM `Session` WHERE RoomID = '" + RoomId + "' AND SpeakerID = '" + SpeakerID + "' AND TimePointID = '" + TimePointID + "' AND Title = '" + new_title + "'";
                }
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
                        let query = "";
                        switch (len) {
                            case 2:
                                query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                                break;
                            case 3:
                                query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                                break;
                            case 4:
                                query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', SpeakerID4 = '" + SpeakerID4 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                                break;
                            case 5:
                                query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', SpeakerID2 = '" + SpeakerID2 + "', SpeakerID3 = '" + SpeakerID3 + "', SpeakerID4 = '" + SpeakerID4 + "', SpeakerID5 = '" + SpeakerID5 + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                                break;
                            default:
                                query = "UPDATE Session SET RoomID = '" + RoomId + "', TimePointID = '" + TimePointID + "', SpeakerID = '" + SpeakerID + "', Title = '" + new_title + "' WHERE Title = '" + old_title + "'";
                        }
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