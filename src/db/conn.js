const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mainData').then(()=>{
    console.log('mongoose connected');
}).catch((err)=>{
    console.log('mongoose error');
})