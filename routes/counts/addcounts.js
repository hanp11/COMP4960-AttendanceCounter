const fs = require('fs');

module.exports = {
    addCountsPage: (req, res) => {
        let query = "SELECT * FROM `session`; "// query database to get all the Rooms

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('addcounts.ejs', {
                title: "Add Counts"
                , message: ''
                , session: result
            });
        });
    },

    addCounts: (req, res) => {
        let session_name = req.body.session_dropdown;
        let start_count = req.body.start_count;
        let middle_count = req.body.middle_count;
        let final_count = req.body.final_count;
        let sID = "SELECT SessionID FROM `session` WHERE Title = '" + session_name + "';";
        
        db.query(sID, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else{
                let session = JSON.stringify(result).split(":")[1].split("}")[0];
                let existingSessionQuery =  "SELECT * FROM `counts` WHERE SessionID = '" + session + "'";
                console.log(existingSessionQuery);
                db.query(existingSessionQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                    if (result.length > 0) {   
                        let oldStartCount = result[0].StartCount;
                         let oldMidCount = result[0].MidCount;
                         let oldFinalCount = result[0].FinalCount;

                         console.log("Old Start Count: " + oldStartCount);
                         console.log("Old Mid Count: " + oldMidCount);
                        console.log("Old Final Count: " + oldFinalCount);
                        if(start_count == -1){
                            start_count = oldStartCount;
                        }
    
                        if(middle_count == -1){
                            middle_count = oldMidCount;
                        }
    
                        if(final_count == -1){
                            final_count = oldFinalCount;
                        }

                        let query = "UPDATE `counts` SET `StartCount`= " + start_count + ",`MidCount`=" + middle_count+ ",`FinalCount`= " + final_count + " WHERE `SessionID` = " + session + ";"; // query database to get all the Rooms
                        
                        // execute query
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            query = "SELECT * FROM `session`; "; // query database to get all the Rooms

                            // execute query
                            db.query(query, (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('addcounts.ejs', {
                                    title: "Add Counts"
                                    ,message: 'Count Updated'
                                    ,session: result
                                    
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

                            query = "SELECT * FROM `session`; "; // query database to get all the Rooms

                            // execute query
                            db.query(query, (err, result) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                res.render('addcounts.ejs', {
                                    title: "Add Counts"
                                    , message: 'Count Added'
                                    , session: result
                                });
                            });
                        });
                            
                    }
                });
            }
        });

    },

};