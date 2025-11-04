import express from 'express'

const app = express()

const PORT = 5000

app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.post('/create',(req,res)=>{
    res.send('This is the post')
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})