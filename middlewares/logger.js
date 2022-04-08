const logger = (req, res , next) => {
    console.log(`URL : ${req.url}`, `Req Type : ${req.method}` )
    next();
}

module.exports = logger