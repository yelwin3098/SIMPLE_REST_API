const User=require('../models/user');
const Car=require('../models/car');

module.exports={
    //validation Done
    index:async (req,res,next)=>{
        const users=await User.find({});
        res.status(200).json(users);
    },
    //validation Done
    newUser:async(req,res,next)=>{
        const newUser=new User(req.value.body);
        const user=await newUser.save();
        res.status(201).json(user);
    },
    //validation Done
    getUser:async(req,res,next)=>{
        const {userId}= req.value.params;
        const user=await User.findById(userId);
        res.status(200).json(user);
    },
    //Validation Done
    replaceUser:async(req,res,next)=>{
        //enforce thst req.body must contain all the fields
        const {userId}=req.value.params;
        const newUser=req.value.body;
        const result=await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },
    //Validation done
    updateUser:async(req,res,next)=>{
        //req.body may conatin any number of fileds
        const {userId}=req.value.params;
        const newUser=req.value.body;
        const result=await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },
    //Validation Done
    getUserCars: async(req,res,next)=>{
        const {userId}=req.value.params;
        const user=await User.findById(userId).populate('cars');
        console.log('user',user);
        res.status(200).json({
            "UserName":user.firstName+' '+ user.lastName,
            "Cars":user.cars
        });
    },
    //Validation Done
    newUserCar:async(req,res,next)=>{
        const {userId}=req.value.params;
        //Create a new car
        const newCar=new Car(req.value.body);
        //Get user
        const user=await User.findById(userId);
        //Assign usr as a car's seller
        newCar.seller=user;
        //Save the car
        await newCar.save();
        //Add car to the user's sellimg array 'cars'
        user.cars.push(newCar);
        //User save
        await user.save();
        res.status(201).json(newCar);
    },
};