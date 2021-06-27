
const express    = require('express');
const razorpay   = require('razorpay');
const bodyParser = require('body-parser');
const multer     = require('multer');
const cors       = require('cors');

require('dotenv').config();

const PORT =  process.env.PORT;

const app = express();
const upload = multer();

// intializing template engine
app.set('views','views');
app.set('view engine','ejs');


app.use(express.static('public'));


// form data / multipart data  parsing 
app.use(upload.array());

// json parsing
app.use(bodyParser.json());

// url encoded data parsing
app.use(bodyParser.urlencoded({extended:true}));


// cors mechanism
app.use(cors("*"));

// razor pay get into picture 
const Razorpay =new razorpay({
     key_id:'rzp_test_TX6V4qZdN5epaE',
     key_secret:'R5xbL5fNlm1ynFPFjlr6Pw7d'
});


app.get("",async(req,res)=>{


      res.render('razorpay.ejs');
     //  res.send('wekcome');
});

app.get("/cdn",async(req,res)=>{


  res.render('amit.ejs');

});

app.post("/order",async(req,res)=>{

    var options = {
        amount: 50000,  
        currency: "INR",
      };

      Razorpay.orders.create(options, function(err, order) {
        console.log(order);
        res.json(order);
      });


});


// start server
app.listen(PORT,()=>{
   console.log(`server is listening on port : ${PORT}`);
});
