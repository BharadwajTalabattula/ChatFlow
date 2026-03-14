let express = require('express');
const cors = require('cors');
const connectDB = require('./database/db')
const cfRouter = require('./Router/cfRouter')
const chatRouter =  require('./Router/chatRouter')
const msgRouter = require('./Router/msgRouter')

let app = express();
app.use(cors());
connectDB();


app.use(express.json());

app.get('/', (req, res)=>{
    res.end(JSON.stringify({message: "Surver running successfully"}))
})

app.use('/api/user', cfRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', msgRouter)


app.listen(3000, ()=>{
    console.log("Server started at http://localhost:3000 ")
})