const NodeService = require('../services/node-sevice');

const nodeService = new NodeService();

const createNode = async (req, res) => {
    const data = {
        name : req.body.name,
        html: req.body.html,
        css: req.body.css,
        js: req.body.js,
        userId: req.body.userId
    }
    try {
        const node = await nodeService.create(data);
        return res.status(201).json({
            success: true,
            message: "Node created successfully",
            data: node,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer")
        return res.status(400).json({
            success: false,
            message: "Something went wrong in creating the node",
            data: {},
            err: error
        });
    }
}

const findbyuserid = async (req, res) => {
    try {
        const nodes = await nodeService.findByUserId(req.params.userId);
        return res.status(200).json({
            success: true,
            message: "Getting nodes from particular id successfully",
            data: nodes,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in node controller layer");
        return res.status(400).json({
            success: false,
            message: "Not able to get all the nodes by userId",
            data: {},
            err: error
        });
    }
}

const updateNode = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name,
            html: req.body.html,
            css: req.body.css,
            js: req.body.js
        }
        const response = await nodeService.updateNode(id, data);
        return res.status(200).json({
            success: true,
            message: "Node updated successfully",
            data: response,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer");
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Not able to update the node by userId",
            data: {},
            err: error
        });
    }
}

const getCode = async (req, res) => {
    try {
        const nodeCode = await nodeService.getCode(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Getting the code successfully",
            data: nodeCode,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(400).json({
            success: false,
            message: "Not able to get the code by userId",
            data: {},
            err: error
})
    }
}

module.exports = {
    createNode,
    findbyuserid,
    updateNode,
    getCode
}