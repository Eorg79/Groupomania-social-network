

exports.isTheAuthor = (req, res, next) => {

    const userId = req.userId;
    const ;
    if (req.params.id == userId) {
        next()
    }   else {
        res.status(403).json({ error: 'opération non autorisée'})
    }

}