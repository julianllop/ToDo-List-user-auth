const jwt = require("jsonwebtoken");
const { User } = require("../db");

const secret = process.env.ACCESS_TOKEN_SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            console.log(err.message);
            if (err) return res.redirect("/login");

            console.log(decodedToken);

            next();
        });
    }
    res.redirect("/login");
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                const user = await User.findByPk(decodedToken.id);
                console.log(user);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };
