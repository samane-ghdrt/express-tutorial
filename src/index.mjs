import express from 'express';
const app=express();
app.use(express.json())
const port=process.env.port || 3000;
const mockUser=[ 
    {id:1, usename:"anson",displayname:"Anson"},
    {id:2, usename:"jack",displayname:"jack"},
    {id:3, usename:"aziz",displayname:"azizi"},
    {id:4, usename:"akbar",displayname:"Akbari"},
    {id:5, usename:"asghar",displayname:"Asghari"}
]
app.get('/',(req,res)=>{
    res.status(201).send({msg:'hello '})
})
app.get('/api/users',(req,res)=>{
    console.log(req.query);
    const{query:{filter,value},}=req;
// if(!filter&&!value) return res.send(mockUser);
if(!filter&&!value) return res.send(
    mockUser.filter(user=>user[filter].includes(value))
);
return res.send(mockUser);

    // res.send([
    //     {id:1, usename:"anson",displayname:"Anson"},
    //     {id:2, usename:"jack",displayname:"jack"},
    //     {id:3, usename:"adam",displayname:"Adam"}

    // ])
})
// app.get('/api/users',(req,res)=>{
//     res.send([
//         {id:1, usename:"anson",displayname:"Anson"},
//         {id:2, usename:"jack",displayname:"jack"},
//         {id:3, usename:"adam",displayname:"Adam"}

//     ])
// })
app.post('/api/user',(req,res)=>{
    const {body}=req.body;
 const newUser = {
    id:mockUser.length+1,
    ...body
};
return res.status(201).send(newUser)
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

app.put('/api/users/:id',(req,res)=>{
    const {body,params:{id}}=req;
    const parseId=parseInt(id);
    if(isNaN(parseId)) return res.status(400);

     const findUserIndex= mockUser.findIndex(user => user.id===parseId);
     if(findUserIndex===-1) return res.send(404);
     mockUser[findUserIndex]={
        id:parseId,
        ...body
     };
     return res.status(200);
});
app.patch('/api/users/:id',(req,res)=>{
    const {body,params:{id}}=req;
    const parseId=parseInt(id);
    if(isNaN(parseId)) return res.status(400);

     const findUserIndex= mockUser.findIndex(user => user.id===parseId);
     if(findUserIndex===-1) return res.send(404);
     mockUser[findUserIndex]={
        ...mockUser[findUserIndex],
        ...body
     };
     return res.status(200);
});
app.listen(port,()=>{
    console.log(`ruuning on port ${port}`);
    
})
