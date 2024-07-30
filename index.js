let express= require("express");
let app= express();
let port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

var methodOverride = require('method-override')

app.use(express.urlencoded ({extended : true})); // middleware

app.set("view engine ","ejs");
app.set ("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

app.listen(port,()=>
{
    console.log("app Listening on port :3000");
})

let posts= [
    {
        username: "krishna",
        id : uuidv4(),
        content : "I am a good web developer"
    },
    {
        username: "chaitanya",
        id : uuidv4(),
        content : "I am a good SQL developer"
    },
    {
        username: "varad",
        id : uuidv4(),
        content : "I am a good Java developer"
    },
    
];


app.get("/addedpost",(req,res)=>
{
  //  console.log(posts);
    res.render("index.ejs", { posts });
})

app.get("/posts/new",(req,res)=>
{
    res.render("newform.ejs");
})

app.post ("/posts",(req,res) =>
{
    let {username, content} = req.body;
    let id= uuidv4();
    posts.push({username,content,id});
    res.redirect("/addedpost");
    

})


app.get("/posts/:id",(req,res)=>
{
    let {id } = req.params;
    let post= posts.find ((p)=> id===p.id);
    console.log( post);
    res.render("detailpost.ejs",{ post });
})

app.patch("/posts/:id/edit",(req,res)=>
{
    let {id } = req.params;
    let newcontent= req.body.content;
    console.log(newcontent);
     let post= posts.find ((p)=> id===p.id);
     post.content = newcontent;
     console.log(post);
     res.redirect("/addedpost");

     
})

app.get ("/posts/:id/edit2",(req,res)=>
{
    let {id } = req.params;
    let newcontent= req.body.content;
    let post= posts.find ((p)=> id===p.id);

    res.render("edit.ejs", { post });
     
})

app.delete("/posts/:id",(req,res)=>
{
    let { id }= req.params;
     posts= posts.filter ((p)=> id!==p.id);      //filter the posts in which only matching id post is not seen
     
     res.redirect("/addedpost");





})