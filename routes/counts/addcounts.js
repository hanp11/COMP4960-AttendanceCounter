const fs = require('fs');

module.exports = {
    addCountsPage: (req, res) => {
        let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`;SELECT * FROM `counts`"; // query database to get all the Rooms

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
                , counts: result[4]
            });
        });
    },

    addCounts: (req, res) => {
        let message = '';
        let session_name = req.body.session_dropdown;
        let start_count = req.body.start_count;
        let middle_count = req.body.middle_count;
        let final_count = req.body.final_count;
        let sID = "SELECT SessionID FROM `session` WHERE Title = '" + session_name + "';";
        
        db.query(sID, [1, 2], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else{
                let session = JSON.stringify(result[0]).split(":")[1].split("}")[0];
                
                let existingSessionQuery =  "SELECT 'SessionID' FROM `counts` WHERE SessionID = '" + session + "'";
                console.log(existingSessionQuery);
                db.query(existingSessionQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {    
                        let query = "UPDATE `counts` SET `StartCount`= " + start_count + ",`MidCount`=" + middle_count+ ",`FinalCount`= " + final_count + " WHERE `SessionID` = " + session+ ";"; // query database to get all the Rooms
                        
                        // execute query
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`;SELECT * FROM 'counts'"; // query database to get all the Rooms

                            // execute query
                            db.query(query, [1, 2], (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('addcounts.ejs', {
                                    title: "Add Counts"
                                    ,message: 'Count Added'
                                    ,room: result[0]
                                    ,speaker: result[1]
                                    ,time: result[2]
                                    ,session: result[3]
                                    ,counts: result[4]
                                    
                                });
                            });
                        });
                    } else {
                        // send the room's details to the database
                        let query = "INSERT INTO `counts`(`SessionID`, `StartCount`, `MidCount`, `FinalCount`) VALUES ('" +
                            session + "', '" + start_count + "', '"+ middle_count + "', '"+final_count +"')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            query = "SELECT * FROM `counts`"; // query database to get all the Rooms

                            // execute query
                            db.query(query, [1, 2], (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('addcounts.ejs', {
                                    title: "Add Counts"
                                    , message: 'Counts Added'
                                    , room: result
                                    
                                });
                            });
                        });
                            
                    }
                });
            }
        });

    },

};
