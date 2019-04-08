module.exports = {
    getCountsSpeakerPage: (req, res) => {
        let query = "SELECT speaker.FirstName, speaker.LastName, speaker.Email, counts.StartCount, counts.MidCount, counts.FinalCount FROM speaker JOIN session ON session.SpeakerID = speaker.SpeakerID JOIN counts ON counts.SessionID = session.SessionID UNION SELECT speaker.FirstName, speaker.LastName, speaker.Email, counts.StartCount, counts.MidCount, counts.FinalCount FROM speaker JOIN session ON session.SpeakerID2 = speaker.SpeakerID JOIN counts ON counts.SessionID = session.SessionID UNION SELECT speaker.FirstName, speaker.LastName, speaker.Email, counts.StartCount, counts.MidCount, counts.FinalCount FROM speaker JOIN session ON session.SpeakerID3 = speaker.SpeakerID JOIN counts ON counts.SessionID = session.SessionID UNION SELECT speaker.FirstName, speaker.LastName, speaker.Email, counts.StartCount, counts.MidCount, counts.FinalCount FROM speaker JOIN session ON session.SpeakerID4 = speaker.SpeakerID JOIN counts ON counts.SessionID = session.SessionID UNION SELECT speaker.FirstName, speaker.LastName, speaker.Email, counts.StartCount, counts.MidCount, counts.FinalCount FROM speaker JOIN session ON session.SpeakerID5 = speaker.SpeakerID JOIN counts ON counts.SessionID = session.SessionID ORDER BY Email"; 

        // execute query
        db.query(query, [1, 2], (err, result) => {
            if (err) {
                res.redirect('/');
            }
            else {

            }
            res.render('viewcounts_speaker.ejs', {
                title: "View Counts"
                , counts: result
            });
        });
    },
};