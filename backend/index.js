require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

const app = express()

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())
app.use(express.json())
app.use('/api', router);

// err hand must be last
app.use(errorHandler)
const start = async () => {
    try {
           await sequelize.authenticate()
           await sequelize.sync()
            app.listen(PORT, () => console.log('Server is shxatel on port ' + PORT))
    } catch (error) {
        console.log(error)
    }
}
console.log(sequelize.options.port)
start()