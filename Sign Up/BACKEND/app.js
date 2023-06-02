const express=require('express')
const app=express()
const data=require('./models/data')
const sequelize=require('./util/database')
const bodyParser=require('body-parser')
const cors=require('cors')
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res,next)=>{
    data.findAll().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.send('<h1>Page Not Found</h1>')
    });
})

app.post('/data',(req,res,next)=>{
    lists=[]
    data.findAll().then((result) => {
        for(let i of result){
            lists.push(i.email)
        }
        console.log(lists);
        console.log(req.body.email);
        console.log(lists.includes(req.body.email));
        if(lists.includes(req.body.email)){
            res.status(400).send('Error')
            return
        }else{
            data.create({
                name: req.body.name,
                sur: req.body.sur,
                email: req.body.email,
                password: req.body.password
            }).then((result) => {
                res.status(200).send(result)
            }).catch((err) => {
                res.status(200).send(err)
            });
            return
        }
    })     
})


sequelize
.sync()
// .sync({force: true})
.then((res) => {
    const hostname = '127.0.0.1';
    const port = 3000;
    app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})
.catch((err) => {
    console.log(err);
});

