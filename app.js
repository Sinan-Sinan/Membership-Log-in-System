const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({path: './config.env'})

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/v1/', require('./routes/data'))


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(`${__dirname}/build`));

    app.get(/.*/, (req, res) => res.sendFile(`build/index.html`, { root: __dirname }));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})