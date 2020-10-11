exports.err404 = (req, res, next) => {
    res.status(404).render('404', {docTitle: 'Page no found'})
};