module.exports = {
    getCountsSessionPage: (req, res) => {
        let query = "SELECT session.Title, room.RoomName, timepoint.TimePoint_Start, timepoint.TimePoint_End, counts.StartCount, counts.MidCount, counts.FinalCount FROM session JOIN room ON session.RoomID = room.RoomID JOIN timepoint ON session.TimePointID = timepoint.TimePointID JOIN counts ON session.SessionID = counts.SessionID"; 

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            else {

            }
            res.render('viewcounts_session.ejs', {
                title: "View Counts"
                , counts: result
            });
        });
    },
};