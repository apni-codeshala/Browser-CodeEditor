const express = require('express');

const {signUp, signIn, isAuthenticated} = require('../../controllers/user-controller')
const {createNode, findbyuserid, updateNode, getCode} = require('../../controllers/node-controller')
const {validateUserAuth} = require('../../middlewares/auth-request-middleware')

const router = express.Router()

// Authentication routes
router.post(
    '/signup',
    validateUserAuth,
    signUp
    );
router.post(
    '/signin',
    validateUserAuth,
    signIn
)
router.get(
    '/isAuthenticated',
    isAuthenticated
)

// Node routes
router.post(
    '/createnode',
    createNode
)
router.get(
    '/findbyuserid/:userId',
    findbyuserid
)
router.patch(
    '/updatenode/:id',
    updateNode
)
router.get(
    '/getcode/:id',
    getCode
)

module.exports = router;