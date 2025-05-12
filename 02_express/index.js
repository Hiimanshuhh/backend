import express from "express"
const app = express()
const port = 3000

app.use(express.json())

let data = []
let nextId = 1

app.post("/values",(req,res)=>{
  const {name,price} = req.body
  const newData = {id: nextId++, name, price}
  data.push(newData)
  res.status(201).send(newData)
})

app.get("/values",(req,res)=>{
  res.status(200).send(data)
})

app.get("/values/:id",(req,res)=>{
  res.status(200).send(data)
})

app.listen(port,()=>{
  console.log(`Server is listening at port : ${port}....`)
})