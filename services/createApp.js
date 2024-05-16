import express from "express"
import { config } from "dotenv"
import urlshortenerRouter from '../routes/linkRouter.js'
config()

const app = express()
app.use(express.json())
const port = process.env.PORT



app.use(urlshortenerRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Helloworld</h1>')
})
async function createApp(){
    
 
    // try{
    //     await client.connect()
    //     console.log('connected to db')
    // }catch(err){
    //     console.log(`Error connecting to db ${err}`)
    // }

    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })

    return app
}

export default createApp;

