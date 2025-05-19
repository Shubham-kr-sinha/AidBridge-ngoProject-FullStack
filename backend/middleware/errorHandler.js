const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);

    res.json({ message: err.message });
    next();
}

module.exports = errorHandler;