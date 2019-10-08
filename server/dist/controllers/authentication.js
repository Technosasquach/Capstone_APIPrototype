"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const autentication_config_1 = require("./../config/autentication.config");
const database_1 = require("./../database/");
const bcrypt = require("bcrypt");
exports.JWTPayloadStandard = {
    iss: "SynLERN",
    sub: "AuthTokenForUser",
    aud: "SynLERNSystems",
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
    iat: Date.now()
};
/**
 * AuthenticationController
 *
 * @export
 * @class AuthenticationController
 */
class AuthenticationController {
    /**
     * authenticateJWT()
     *
     * Tells me if the JWT is authentic, and should be trusted
     *
     * @static
     * @param {string} token
     * @returns {boolean} Is valid or not
     * @memberof AuthenticationController
     */
    static authenticateJWT(token, authKey = autentication_config_1.AuthenticationConfig.authKey) {
        // The jwt.verify function exports the JSON of the payload, or an error
        // Using try and catch for the error, then populating the JSON structure with a valid clause
        try {
            return Object.assign({}, jwt.verify(token, authKey), { valid: true });
        }
        catch (_a) {
            return Object.assign({}, exports.JWTPayloadStandard, { username: "bad", accessLevel: database_1.EUserAuthLevel.USER, valid: false });
        }
    }
    /**
     * authenticateUsernamePassword()
     *
     * Tell me if the username and password is authentic to a user in the DB
     *
     * @static
     * @param {string} username Given username
     * @param {string} password Given password
     * @param {Function} callback Callback to tell if the username and password was successful
     * @memberof AuthenticationController
     */
    static authenticateUsernamePassword(username, password, callback) {
        // Check if username or password is authentic to the database
        database_1.User.findOne({ username }, (err, res) => {
            if (err)
                console.log(err);
            // Check that the password is in fact fine
            if (res) {
                if (AuthenticationController.cryptoComparePassword(password, res.password)) {
                    callback(true, res);
                }
                else {
                    callback(false);
                }
            }
            else {
                callback(false);
            }
        });
    }
    /**
     * generateJWT
     *
     * Generate a JWT based on Username and Password etc, expiry in 30 days, signed now etc
     *
     * @static
     * @param {string} username Username to encode
     * @param {EUserAuthLevel} accessLevel Access level to encode
     * @returns {string} Returned JWT token
     * @memberof AuthenticationController
     */
    static generateJWT(username, accessLevel) {
        const token = jwt.sign({
            username,
            accessLevel,
            iat: exports.JWTPayloadStandard.iat
        }, autentication_config_1.AuthenticationConfig.authKey, {
            expiresIn: "30d",
            audience: exports.JWTPayloadStandard.aud,
            issuer: exports.JWTPayloadStandard.iss,
            subject: exports.JWTPayloadStandard.sub,
        });
        console.log(JSON.stringify(token));
        return token;
    }
    /**
     * cryptoPassword
     *
     * Hashes a password based on core config from the AuthenticationConfig file, and returns the final hashed string
     * Utilizes the BCrypt algorithm, fast and efficiently. Other cryptographic encodings could be used but not needed for the project
     *
     * @static
     * @param {string} password Given password to hash
     * @returns {string} Hashed password
     * @memberof AuthenticationController
     */
    static cryptoPassword(password) {
        return bcrypt.hashSync(password, autentication_config_1.AuthenticationConfig.saltIterations);
    }
    static cryptoComparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    /**
     * createUser
     *
     * Will create a user in the database, with the given username and password.
     * Said password will be hashed using the cryptoPassword function
     *
     * @static
     * @param {string} username
     * @param {string} password
     * @param {EUserAuthLevel} authLevel
     * @memberof AuthenticationController
     * @see cryptoPassword
     */
    static createUser(username, password, authLevel) {
        const user = new database_1.User();
        user.username = username;
        user.password = this.cryptoPassword(password);
        user.accessLevel = authLevel;
        console.log(user);
        user.save();
    }
    static DaysFromNowInMilliseconds(days) {
        return Date.now() + days * 24 * 60 * 60 * 1000;
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.js.map