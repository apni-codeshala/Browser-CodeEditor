const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index')

const app = express();

const prepareAnsStartServer =  () => {

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started running on port : ${PORT}`);
    })

}

prepareAnsStartServer();