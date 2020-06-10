const express= require('express');
const logger= require('morgan');
const UserRoute=require('./routes/users');
const CarRoute=require('./routes/cars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const helmet=require('helmet');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/apiproject');

const app=express();

app.use(helmet());
//Middelware
app.use(logger('dev'));
app.use(bodyParser.json());
//Route
app.use('/users',UserRoute);
app.use('/cars',CarRoute);

//Catch 404 Errors and forward them to error handler
app.use((req,res,next)=>{
    const err=new Error('Not Found');
    err.status=404;
    next(err);
});

//Error handler functions
app.use((err,req,res,next)=>{
    const error=app.get('env')==='development'? err:{};
    const status=err.status||500;

    //Response to client
    res.status(status).json({
        error:{
            message:error.message
        }
    });
    //Response to ourselves
    console.error(err);
});

//Start the server
const port=app.get('port')|| 3000;
app.listen(port,()=> console.log(`Server is listining on port ${port}`));