const NodeRepository = require('../repository/node-repository');

class NodeService {

    constructor() {
        this.nodeRepository = new NodeRepository();
    }

    async create(data) {
        try {
            const node = await this.nodeRepository.createNode(data);
            return node;
        } catch (error) {
            console.log("Something went wrong inside node service");
            throw error;
        }
    }

    async findByUserId(userId) {
        try {
            const nodes = await this.nodeRepository.searchNodeByUserId(userId);
            return nodes;
        } catch (error) {
            console.log("Something went wrong inside node service");
            throw error;
        }
    }

    async updateNode(id, data) {
        try {
            const response = await this.nodeRepository.updateNode(id, data)
            return response;
        } catch (error) {
            console.log("Something went wrong inside node service");
            throw error;
        }
    }

    async getCode(id) {
        try {
            const data = await this.nodeRepository.getNodeCode(id);
            return data;
        } catch (error) {
            console.log("Something went wrong inside node service");
            throw error;
        }
    }

}

module.exports = NodeService;