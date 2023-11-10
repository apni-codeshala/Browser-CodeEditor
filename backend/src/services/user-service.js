const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');


class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data)
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '30d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in creating the token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in validating the token");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Password was wrong");
            throw error;
        }
    }

    async signIn(data) {
        try {
            const user = await this.userRepository.getByEmail(data.email);
            const passwordMatch = this.checkPassword(data.password, user.password);
            if(!passwordMatch) {
                console.log("Password doesn,t match");
                throw { error: "Incorrect Pasword"};
            }

            const newJwt = this.createToken({
                email: user.email,
                id: user.id
            });

            return newJwt;

        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw { error: "Invalid Token"};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw { error: "No user with corresponding token exist"}
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

}

module.exports = UserService