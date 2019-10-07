
import * as jwt from "jsonwebtoken";
import { AuthenticationConfig } from "./../config/autentication.config";
import { EUserAuthLevel, UserModel, UserSchema, User } from "./../database/"
import * as bcrypt from "bcrypt"

/**
 * JWTPayloadStandard
 * 
 * A standard interface for all JWT payloads
 *
 * @export
 * @interface JWTPayloadStandard
 */
export interface JWTPayloadStandard {
    iss: string, // Issuer identity
    sub: string, // Subject of the token
    aud: string, // Who this token is meant for
    exp: number, // Expiry date
    iat: number  // Date of issue
}

/**
 * JWTPayload
 * 
 * 
 * 
 * @export
 * @interface JWTPayload
 * @extends {JWTPayloadStandard}
 */
export interface JWTPayload extends JWTPayloadStandard {
    username: string, // Username of the user
    accessLevel: EUserAuthLevel // Auth level of the user
}

export const JWTPayloadStandard: JWTPayloadStandard = {
    iss: "SynLERN",
    sub: "AuthTokenForUser",
    aud: "SynLERNSystems",
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
    iat: Date.now()
}

export interface JWTPayloadVerification extends JWTPayload { 
    valid?: boolean
}

/**
 * AuthenticationController
 *
 * @export
 * @class AuthenticationController
 */
export class AuthenticationController {

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
    public static authenticateJWT(token: string, authKey = AuthenticationConfig.authKey): JWTPayloadVerification {
        // The jwt.verify function exports the JSON of the payload, or an error
        // Using try and catch for the error, then populating the JSON structure with a valid clause
        try {
            return { ...jwt.verify(token, authKey) as JWTPayloadVerification, valid: true };
        } catch {
            return { ...JWTPayloadStandard, username: "bad", accessLevel: EUserAuthLevel.USER, valid: false };
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
    public static authenticateUsernamePassword(username: string, password: string, callback: Function) {
        // Check if username or password is authentic to the database
        User.findOne({ username, password: this.cryptoPassword(password)}, (err: any, res: any) => {
            if(err) console.log(err);
            if(res) callback(true); else callback(false);
        })
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
    public static generateJWT(username: string, accessLevel: EUserAuthLevel): string {
        const token = jwt.sign(
            { 
                username, 
                accessLevel,
                iat: JWTPayloadStandard.iat
            }, 
            AuthenticationConfig.authKey, 
            { 
                expiresIn: "30d", 
                audience: JWTPayloadStandard.aud,
                issuer: JWTPayloadStandard.iss,
                subject: JWTPayloadStandard.sub,

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
    public static cryptoPassword(password: string): string {
        return bcrypt.hashSync(password, AuthenticationConfig.saltIterations);
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
    public static createUser(username: string, password: string, authLevel: EUserAuthLevel) {
        const user = new User();
        user.username = username;
        user.password = this.cryptoPassword(password);
        user.accessLevel = authLevel;
        user.save();
    }

}