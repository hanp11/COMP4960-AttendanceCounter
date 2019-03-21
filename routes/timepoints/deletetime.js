const fs = require('fs');

module.exports = {
    deleteTimePage: (req, res) => {

        let query = "SELECT * FROM `TimePoint`";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('deletetime.ejs', {
                title: "Delete Time Point"
                ,time: result
                ,message: ''
            });
        });
    },

    deleteTime: (req, res) => {
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

        let existing_start_time_key = exisiting_start_hour+":"+exisiting_start_minute+":00";
        let existing_end_time_key = exisiting_end_hour+":"+exisiting_end_minute+":00";
        let deleteTimeQuery = "DELETE FROM TimePoint WHERE TimePoint_Start = '" + existing_start_time_key + "' and TimePoint_End = '" + existing_end_time_key + "'";

            db.query(deleteTimeQuery, (err, result) => {
                if (err) {
                    let query = "SELECT * FROM `TimePoint`";
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('deletetime.ejs', {
                            title: "Delete Time Point"
                            ,time: result
                            ,message: 'Error, Time Point is being used by a Session'
                        });
                    });
                }
                query = "SELECT * FROM `TimePoint`";
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('deletetime.ejs', {
                        title: "Delete Time Point"
                        ,time: result
                        ,message: 'Time Deleted'
                    });
                });
            });

    }
};