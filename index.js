const express = require('express');

const mysql = require('mysql');

const path =require('path');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs')
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Ajey@2006",
    database:"exam",
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',(req,res)=>{
    const{id,name,email,phone} = req.body;
    const sqlquery = "Insert into students (id,name,email,phone) values (?,?,?,?)";
    pool.query(sqlquery,[id,name,email,phone],(err,result)=>{
        if(err) throw err;
        else{
            res.redirect('/display');
        }
    })
})

app.get('/display',(req,res)=>{
    const qry = 'select * from students';
    pool.query(qry,(err,result)=>{
        res.render(__dirname+'/data',{data:result});
    })
})

app.get('/delete-students',(req,res)=>{
    const qry = "delete from  students where id = ?";
    const id = req.query.id;
    pool.query(qry,[id],(err,result)=>{
        if(err) throw err;
        else{
            res.redirect('/display');
        }
    })
})

app.get('/update-students',(req,res)=>{
    const qry = "select *  from  students where id = ?";
    const id = req.query.id;
    pool.query(qry,[id],(err,result)=>{
        if(err) throw err;
        else{
            res.render(__dirname+'/update',{data:result});
        }
    })
})

app.post('/update-students',(req,res)=>{
    const  id = req.body.id;
    const  name = req.body.name;
    const  email = req.body.email;
    const phone = req.body.phone;
    const qry = "update students set name=? ,email=? ,phone = ? where id=?";
    pool.query(qry,[name,email,phone,id],(err,result)=>{
        if(err) throw err;
        else{
            res.redirect('/display');
        }
    })
})

app.get('/search-student',(req,res)=>{
    const qry = 'select * from students';
    pool.query(qry,(err,result)=>{ 
        if (err) throw err;
        else{
          res.render(path.join(__dirname,'search-student'),{data:result});
        }
    })
})

app.get('/search', (req, res) => {
    const name = req.query.name;   
    const email = req.query.email;   
    const phone = req.query.phone;
    
    const qry = "SELECT * FROM students WHERE name LIKE ? and email LIKE ? and phone LIKE ?";
    
    pool.query(qry, [`%${name}%`, `%${email}%`, `${phone}%`], (err, result) =>{
        try{
            res.render(path.join(__dirname, 'search-student'), { data: result });
        }
        catch(err){
            res.redirect("/search");
        }
    });

})
app.listen(5000,(err)=>{
    if(err) throw err;
    else console.log("Successfully connected..");
})