const fs = require('fs');

module.exports = {
    editTimePage: (req, res) => {

        let query = "SELECT * FROM `TimePoint`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('edittime.ejs', {
                title: "Edit Time Slot"
                ,time: result
                ,message: ''
            });
        });
    },
    editTime: (req, res) => {
        let existing_time = req.body.exisiting_time_dropdown;

        let start_hour = req.body.start_hour_dropdown;
        let start_minute = req.body.start_minute_dropdown;
        let start_am_pm = req.body.start_am_pm_dropdown ;

        let end_hour = req.body.end_hour_dropdown;
        let end_minute = req.body.end_minute_dropdown;
        let end_am_pm = req.body.end_am_pm_dropdown ;
        
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

        let existing_start_time_key = exisiting_start_hour+":"+exisiting_start_minute+":00";
        let existing_end_time_key = exisiting_end_hour+":"+exisiting_end_minute+":00";

        if(start_am_pm == 'PM'){
            start_hour = parseInt(start_hour) + 12;
        }

        if(end_am_pm == 'PM'){
            end_hour = parseInt(end_hour) + 12;
        }

        let existingTimeQuery = "SELECT * FROM `timepoint` WHERE TimePoint_Start = '" + start_hour + start_minute + "' AND TimePoint_End = '" + end_hour + end_minute + "'";
        db.query(existingTimeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                let query = "SELECT * FROM `TimePoint`";
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('edittime.ejs', {
                        title: "Edit Time Slot"
                        ,time: result
                        ,message: 'Time Slot already exists'
                    });
                });
                
            } else {
                // send the room's details to the database
                let query = "UPDATE TimePoint SET TimePoint_Start = '" + start_hour  +  start_minute + "' , TimePoint_End = '" + end_hour + end_minute +  "' WHERE TimePoint_Start = '" + existing_start_time_key + "' and TimePoint_End = '" + existing_end_time_key + "'";
                console.log(query);
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                    query = "SELECT * FROM `TimePoint`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('edittime.ejs', {
                            title: "Edit Time Slot"
                            ,time: result
                            ,message: 'Time Slot Edited'
                        });
                    });
                });
                    
            }
        });
    }

};