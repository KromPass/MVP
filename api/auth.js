/**
@fileOverview Authentication and authorization module
@module Auth
*/
const console = require('better-console');
const config = require('../config/config.js');
const errors = require('../config/errors.js');
const { sequelize, email } = require('./services.js');
const models = sequelize.models;
const jws = require('jws');
const crypto = require('crypto');

const Auth = module.exports = {
    /**
     * 3rd party authentication provided by Facebook and Google Plus
     * @param  {String}  provider    Google | Facebook
     * @param  {String}  accessToken user access token on social
     * @param  {String}  id          user id on social
     * @param  {String}  email       user email on social
     * @param  {String}  firstName   user fist name
     * @param  {String}  lastName    user last name
     * @return {String}  JWT signed token
     */
    connect: async ({ provider, accessToken, id, email, firstName, lastName }) => {
        let _user = { [`${provider}AccessToken`]: accessToken, [`${provider}Id`]: id, email, firstName, lastName };
        let where = { $or: { email, [`${provider}Id`]: id } };
        let user = await models.user.find({ where, raw: true });

        if(user) {
            await models.user.update(_user, { where });
            user = await models.user.find({ where, raw: true });
        }
        else {
            _user.password = Auth.getHashedPassword({ password: Math.random() });
            user = await models.user.create(_user);
        }

        const token = Auth.getToken(user);
        return token;
    },

    /**
     * Sign up user on app
     * @param  {String}  email     user email
     * @param  {String}  password  user password
     * @param  {String}  firstName user first name
     * @param  {String}  lastName  user last name
     * @return {String}  JWT signed token
     */
    signUp: async ({ email, password, firstName, lastName }) => {
        let _user = { email, password: Auth.getHashedPassword({ password }), firstName, lastName };
        let user = await models.user.create(_user);

        const token = Auth.getToken(user);
        return token;
    },

    /**
     * Get user JWT signed token
     * @param  {String}  email    user email
     * @param  {String}  password user password
     * @return {String}  JWT signed token
     */
    signIn: async ({ email, password }) => {
        let where = { email, password: Auth.getHashedPassword({ password }) };
        let user = await models.user.find({ where, raw: true });

        if(!user)
            throw errors.SIGN_IN_ERR1;

        const token = Auth.getToken(user);
        return token;
    },

    getHashedPassword: ({ password }) => {
        const result = crypto.createHash('sha256').update(String(password)).digest('hex');
        return result;
    },

    getToken: (user) => {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: user, secret: config.secret });
        return token;
    },

    /**
     * Get user from token if valid
     * @param  {String} token JWT signed token
     * @return {Object}       authenticated user
     */
    me: ({ token }) => {
        try {
            jws.verify(token, 'HS256', String(config.secret));
            let decoded = jws.decode(token);
            decoded = JSON.parse(decoded.payload);
            return decoded;
        }
        catch(error) {
            throw errors.ME_ERR1;
        }
    },

    /**
     * Send user an email to recover his password
     * @param  {String}  email user email
     * @return {Boolean} Whether email was succesfully sent or not
     */
    recoverPassword: async ({ email }) => {
        let where = { email };
        let user = await models.user.find({ raw: true, where });

        if(!user)
            throw errors.RECOVER_PASSWORD_ERR1;

        try {
            let result = await mail({ recipient: user.email, title: 'Recover your password', content: '<b>Yo!</b>' });
            return true;
        }
        catch(error) {
            console.error(error);
            throw errors.RECOVER_PASSWORD_ERR2;
        }
    },
};