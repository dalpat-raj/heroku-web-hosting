const express = require('express')
const app = express();
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000;
 
// export import files 
require('./db/conn')
const Register = require('./models/register');
const register = require('./models/register');

// path 
const static_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', templates_path)
hbs.registerPartials(partials_path)
app.use(express.static(static_path))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.render('index')
})
app.get('/login', (req, res)=>{
    res.render('login')
})
app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', async(req, res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname  : req.body.lastname,
                email     : req.body.email,
                phone     : req.body.phone,
                password  : password,
                confirmpassword : cpassword
            })
            await registerEmployee.save();
            res.status(201).render('index')
        }else{
            res.send('password are not match')
        }
    } catch (error) {
        res.status(400).send('error')
    }
})

// login 
app.post('/login', async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await Register.findOne({email:email})
        
        if(result.password === password){
            res.status(201).render('index')
        }else{
            res.send('invaild user')
        }    
    } catch (error) {
        res.status(400).send(error)
    }
})




app.listen(port, ()=>{
console.log('connected');
})