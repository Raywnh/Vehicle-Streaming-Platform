// cd backend -> npm install express nodemon 
// npm run devStart 
// create file -> .gitignore -> /node_modules
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const keyRouter = require('./routes/key')
app.use('/key', keyRouter)


app.listen(8000, () => {console.log("Server started on Port 8000")})