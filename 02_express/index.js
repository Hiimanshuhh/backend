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
  const val = data.find(t=> t.id=== parseInt(req.params.id))
  if(!val){
    return res.status(404).send("ERROR NOT FOUND")
  }
  res.status(200).send(val)
})

app.put("/values/:id",(req,res)=>{
  const val = data.find(t=> t.id=== parseInt(req.params.id))
  if(!val){
    return res.status(404).send("ERROR NOT FOUND")
  }
  const {name,price} = req.body
  val.name = name
  val.price = price
  res.status(200).send(val)
})

app.delete("/values/:id",(req,res)=>{
 const index = data.findIndex(t=>t.id === parseInt(req.params.id))
 if(index=== -1){
  return res.status(404).send("Error Value Not Found")
 }
 data.splice(index,1)
 return res.status(204).send("Deleted Successfully")

})

app.listen(port,()=>{
  console.log(`Server is listening at port : ${port}....`)
})