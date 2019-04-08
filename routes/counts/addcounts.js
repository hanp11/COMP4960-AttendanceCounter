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

        var contents = fs.readFileSync("username.json");
        var username = JSON.parse(contents);

        let session_name = req.body.session_dropdown;
        let start_count = req.body.start_count;
        let middle_count = req.body.middle_count;
        let final_count = req.body.final_count;
        let start_user = username.name; 
        let mid_user = username.name;
        let end_user = username.name;
        
        let sID = "SELECT * FROM `session` WHERE Title = '" + session_name + "';";
        console.log(start_user);
        db.query(sID, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            else{
                let session = result[0].SessionID
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
                        let oldStartName = result[0].User_Name_Start;
                        let oldMidName = result[0].User_Name_Mid;
                        let oldEndName = result[0].User_Name_End;
                         console.log("Old Start Count: " + oldStartCount);
                         console.log("Old Mid Count: " + oldMidCount);
                        console.log("Old Final Count: " + oldFinalCount);
                        if(start_count == -1){
                            start_count = oldStartCount;
                            start_user = oldStartName;
                        }
    
                        if(middle_count == -1){
                            middle_count = oldMidCount;
                            mid_user = oldMidName;
                        }
    
                        if(final_count == -1){
                            final_count = oldFinalCount;
                            end_user = oldEndName; 
                        }

                        let query = "UPDATE `counts` SET `StartCount`= " + start_count + ",`MidCount`=" + middle_count+ ",`FinalCount`= " + final_count+ ",`User_Name_Start`= '" + start_user+ "',`User_Name_Mid`= '" + mid_user+ "',`User_Name_End`= '" + end_user + "' WHERE `SessionID` = " + session + ";"; // query database to get all the Rooms
                        
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
                        let query = "INSERT INTO `counts`(`SessionID`, `StartCount`, `MidCount`, `FinalCount`,`User_Name_Start`,`User_Name_Mid`,`User_Name_End`) VALUES ('" +
                            session + "', '" + start_count + "', '"+ middle_count + "', '"+final_count + "', '"+start_user + "', '"+mid_user + "', '"+end_user +"')";
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
