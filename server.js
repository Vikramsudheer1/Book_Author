const express = require('express');
var bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
app.set("view engine","ejs")
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }))
var Book=[{
    "BookName":"Web Development",
    "AuthorName":"Developer"
    
}];
app.use(session({
    secret: 'codeforgeek',
    saveUninitialized: true,
    resave: true
}));

app.get('/',function(req,res){
    res.render('index',{"name": Book, "msg":req.flash('message')})
})
app.post('/add',function(req,res){
    var a={
        "BookName":req.body.BookName,
        "AuthorName":req.body.AuthorName,
        
    }
    Book.push(a)
    req.flash('message',"Book Added Successfully")
    res.redirect('back');
})
app.get('/delete/:id',function(req,res){
    const id=req.params.id
    Book.splice(id,1);
    req.flash('message',"Book Deleted Successfully")
    res.redirect('back')
})
app.get('/update/:id',function(req,res){
    const idu=req.params.id
    res.render('update',{ "id":idu, "Book":Book[idu] })
})
app.post('/update/:id',function(req,res){
    const idu=req.params.id
    Book[idu].BookName = req.body.BookName
    Book[idu].AuthorName = req.body.AuthorName
    req.flash('message',"Updated Successfully")
    res.redirect('/')
})


app.listen(2000);