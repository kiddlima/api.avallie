const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Supplier = require('../schema/supplier.schema');
const fs = require('fs');

module.exports = function (passport){
    var options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = fs.readFileSync('./api.key', 'utf8');
    passport.use(new JwtStrategy(options, (jwtPayload, done) => {
        Supplier.getSupplierById(jwtPayload._id, (err, supplier) => {
            if(err){
                return done(err, false);
            }
            if(supplier){
                return done(null, supplier);
            } else {
                return done(null, false);
            }
        })
    }))
}