module.exports = {
    getDataPage: (req, res) => {
        let query = "SELECT * FROM `room`;SELECT * FROM `speaker`;SELECT * FROM `timepoint`;SELECT * FROM `session`;SELECT * FROM `counts`"; // query database to get all the Rooms

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            else{
                // console.log(result[0]); // [{1: 1}]
                // console.log(result[1]); // [{2: 2}]
                // console.log(result[2]); // [{2: 2}]
                // console.log(result[3]); // [{2: 2}]
            }
            res.render('viewData.ejs', {
                title: "Welcome to Boston Code Camp | View Room"
                ,room: result[0]
                ,speaker: result[1]
                ,timepoint: result[2]
                ,session: result[3]
                ,counts: result[4]
                
            });
        });
    },
};