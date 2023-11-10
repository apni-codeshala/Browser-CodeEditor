const {User} = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            return user;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error;
        }
    }

    async getById(id) {
        try {
            const user = User.findByPk(id);
            return user;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error;
        }
    }

    async deleteByEmail(email) {
        try {
            const response = User.destroy({
                where: {
                    email: email
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;