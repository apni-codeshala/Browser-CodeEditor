const {Nodes} = require('../models/index');

class NodeRepository  {

    async createNode(data) {
        try {
            const node = await Nodes.create(data);
            return node;
        } catch (error) {
            console.log("Something went wrong inside node repositort");
            throw error
        }
    }

    async searchNodeByUserId(userId) {
        try {
            const nodes = await Nodes.findAll({
                where: {
                    userId: userId
                }
            });
            return nodes;
        } catch (error) {
            console.log("Something went wrong in node repository");
            throw error;
        }
    }

    async updateNode(id, data) {
        try {
            const response = await Nodes.update(
                data, 
                {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong in node repository");
            throw error;
        }
    }

    async getNodeCode(id) {
        try {
            const code = await Nodes.findOne({
                where: {
                    id: id
                }
            })
            return code;
        } catch (error) {
            console.log("Something went wrong in node repository");
            throw error;
        }
    }

}

module.exports = NodeRepository;