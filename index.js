// https://www.figma.com/file/GfDm3eY1NhyWQYP5RDQRtg/Online-Shop?node-id=709%3A2&t=rat8jBSdzP9Ihaii-0
// Содаейте проект на NodeJS + Express + EJS + CSS
// Ваша задача сделать верстку проекта как это указанно на дизайне выше.

const express = require('express');
// const path = require("path");
const app = express();
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/user').then(() => {
  console.log('Connected to mongoDB');
}).catch((e) => {
  console.log('Failed to connect to mongoDB');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


const UserSchema = new mongoose.Schema({
  name: String, 
  price: String,
  sale: String,
  image : String,
})

const User = mongoose.model("user" , UserSchema)


app.post('/new' , async(req , res) => {
  await new User({
    name: 'asd', 
    price:'asd',
    sale: "asd",
    image : "asd"
  }).save()
  res.send('OK')
})

app.post('/edit' , async(req , res) => {
  const { id, name, price, sale, image } = req.body;
  console.log(req.body);
  await User.updateOne(
    {
      _id: req.body.id
    },
    {
      name: req.body.name,
      price: req.body.price,
      sale: req.body.sale,
      image: req.body.image
    },
    {
      new: true
    }
  )
  res.redirect('/');
  // res.sendFile('index.ejs');
})


const port = 7000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/header", (req, res) => {
  res.render("header");
});

app.get("/", async(req, res) => {
  const data = await User.find();
  res.render("index" , {data});
});

app.get("/new", (req, res) => {
  res.render("new");
  // res.sendFile(__dirname + '/new.html')
  // res.render(path.join(__dirname , 'NewProduct/views/new'))
});

app.get("/edit/:id", async (req, res) => {
  const UserData = await User.findById(req.params.id)
  console.log(UserData);
  console.log(req.params.id);
  res.render("edit" , {data: UserData});
});

app.get("/cheirs", (req, res) => {
  try{
    res.render("cheirs");
    res.render("req.path");
  } catch (error) {
    // If the page is not found, render the 404 page
    res.render("error404");
  }
});

app.get("/404", (req, res) => {
    res.render("error404");
});

app.get("/", (req, res) => {
  res.render("index", { images }); // Pass the images array to the EJS template
});

app.use((req, res, next) => {
  try {
      // Try to render the requested page
      res.render(req.path);
  } catch (err) {
      // If the page is not found, render the 404 page
      res.status(404).sendFile('error404.ejs');
  }
});



