module.exports = (roles)=> {
    return (req, res, next) => {
        const userRole = req.body.role;
        if(roles.includes(userRole)) {
            next();
        } else {
            return res.status(400).send("You can't do it!");
        }
    }
}