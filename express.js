import express from 'express'

const app = express()
app.use(express.json())
const PORT = 5000




app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.post('/create',(req,res)=>{
    const {name,email,password}=req.body
    res.json({name,email,password})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})