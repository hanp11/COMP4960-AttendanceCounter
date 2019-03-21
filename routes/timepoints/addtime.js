const fs = require('fs');

module.exports = {
    addTimePage: (req, res) => {
        let query = "SELECT * FROM `timepoint`"; // query database to get all the Rooms
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
        res.render('addtime.ejs', {
            title: "Add Time Point"
            ,message: ''
            ,time: result
            });
        });
    },

    addTime: (req, res) => {

        let message = '';
        let start_hour = req.body.start_hour_dropdown;
        let start_minute = req.body.start_minute_dropdown;
        let start_am_pm = req.body.start_am_pm_dropdown ;

        let end_hour = req.body.end_hour_dropdown;
        let end_minute = req.body.end_minute_dropdown;
        let end_am_pm = req.body.end_am_pm_dropdown ;
        console.log(start_am_pm);
        if(start_am_pm == 'PM'){
            start_hour = parseInt(start_hour) + 12;
            console.log(start_hour);
        }

        if(end_am_pm == 'PM'){
            end_hour = parseInt(end_hour) + 12;
            console.log(start_hour);
        }

        let existingTimeQuery = "SELECT * FROM `timepoint` WHERE TimePoint_Start = '" + start_hour + start_minute + "' AND TimePoint_End = '" + end_hour + end_minute + "'";

        db.query(existingTimeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Time Point already exists';
                res.render('addtime.ejs', {
                    message,
                    title: "Add Time Point"
                });
            } else {
                // send the time details to the database
                let query = "INSERT INTO `TimePoint` (TimePoint_Start, TimePoint_End) VALUES ('" +
                    start_hour + start_minute + "', '" +  end_hour + end_minute + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    query = "SELECT * FROM `timepoint`"; // query database to get all the Rooms
                    // execute query
                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                    res.render('addtime.ejs', {
                        title: "Add Time Point"
                        ,message: 'Time Added'
                        ,time: result
                        });
                    });
                });
                    
            }
        });
    },

};