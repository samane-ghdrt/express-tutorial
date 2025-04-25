import express from 'express';
const app=express();
const port=process.env.port || 3000;
app.get('/',(req,res)=>{
    res.status(201).send({msg:'hello '})
})
app.get('/api/users',(req,res)=>{
    res.send([
        {id:1, usename:"anson",displayname:"Anson"},
        {id:2, usename:"jack",displayname:"jack"},
        {id:3, usename:"adam",displayname:"Adam"}

    ])
})
app.get('/api/users/:id',(req,res)=>{
    console.log(req.params);
    const id=parseInt(req.params.id)
    console.log(id);
    if(isNaN(id)) return res.status(404).send({msg:"bad request , invalid id"})
    const finduser=mockUser.find((user)=> user.id===id);
if(!finduser) return res.sendStatus(404)
    return res.send(finduser)
})
app.get('/api/product',(req,res)=>{
    res.send([{id:123,name:"chicken",price:12.99}])
})
app.listen(port,()=>{
    console.log(`ruuning on port ${port}`);
    
})