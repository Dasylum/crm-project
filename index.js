var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bcrypt = require('bcrypt');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

var port = process.env.PORT || 8080;

passport.use(
    new LocalStrategy((username, password, done) => {
      customerModel.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            return done(null, user)
          }

          else {
            return done(null, false, { message: 'Incorrect Password' })
          }
        })
      });
    })
);

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    customerModel.findById(id, function(err, user) {
        done(err, user);
    });
});

mongoose.connect('mongodb+srv://NewDiet:Ds8764082465@cluster0.sbfkl.mongodb.net/crmApplicationDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var customerModel = require('./models/customer');
var productModel = require('./models/product');
var categoryModel = require('./models/category');
var orderModel = require('./models/order');

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
}
)

app.get('/log-out', (req, res) => {
    req.logout();
    res.json({
        message: "session destroyed"
    })
})

app.post('/add', (req, res) => {
    const { firstName, lastName, memberStatus, password, username} = req.body;
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        const customerInstance = new customerModel({
            firstName,
            lastName,
            username,    
            password: hashedPassword,    
            memberStatus
        })
    
        customerInstance.save({}, (err, result) => {
            if(err) {
                throw err
            }
    
            else {
                res.json({
                    message: "database updated"
                })
            }
        })
    })
})

app.get('/users', (req, res) => {
    customerModel.find().then(result => {
        res.json(result);
    })
})


app.get('/search/:id', (req, res) => {
    customerModel.find({ firstName: req.params.id }, (err, result) => {
        if(err) {
            throw err
        }

        else {
            res.json(result);
        }
    })
})

app.post('/products/add/:id', (req, res) => {
    const {name, price, quantity} = req.body;
    const category = req.params.id;

    categoryModel.findById(req.params.id).then(result => {

        const productModelInstance = new productModel({
            name, category, price, quantity
        })
    
        productModelInstance.save({}, err => {
            if(err) {
                throw err
            }
    
            else {
                res.json({
                    message: 'Product added.'
                })
            }
        })
    })
})

app.get('/products', (req, res) => {
    productModel.find().then(result => {
        res.json(result);
    })
})

app.post('/products/categories/add', (req, res) => {
    const {name} = req.body;

    const categoryInstance = new categoryModel({
        name,
    })

    categoryInstance.save({}, err => {
        if(err) {
            throw err
        }

        else {
            res.json({
                message: 'Category added.'
            })
        }
    })
})

app.get('/products/categories', (req, res) => {
    categoryModel.find().then(result => {
       res.json(result);
    })
})

app.get('/categories/:id', (req, res) => {
    categoryModel.findById(req.params.id).then(result => {
        res.json(result);
    })
})

app.get('/category/products/:id', (req, res) => {
    productModel.find({category: req.params.id}, (err, result) => {
        if (err) {
            throw err;
        }

        else {
            res.json(result);
        }
    })
})

app.post('/order/:customer/:product', (req, res) => {
    const orderInstance = new orderModel();
    orderInstance.customer = req.params.customer;
    orderInstance.product = req.params.product;
    
    orderInstance.save().then((err, result) => {
        res.json({
            message: "order placed."
        })
    })
})

app.get('/orders', (req, res) => {
    orderModel.find().then(result => {
        res.json(result);
    })
})

app.delete('/product/delete/:id', (req, res) => {
    productModel.findByIdAndDelete(req.params.id).then(result => {
        res.json({
            message: 'Product deleted.'
        })
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, (req, res) => {
    console.log("server running on port 8000...");
});