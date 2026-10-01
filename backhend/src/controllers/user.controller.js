const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function RegisterUser(req, res) {

    try {

        const { Name, Email, Password } = req.body;

        if (!Name || !Email || !Password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const exitUser = await UserModel.findOne({ Email });

        if (exitUser) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hassedpassword = await bcrypt.hash(Password, 10);

        const newUser = await UserModel.create({
            Name,
            Email,
            Password: hassedpassword
        });

        const token = jwt.sign(
            { Email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(201).json({
            message: 'User Registered Successfully',
            newUser: {
                id: newUser._id,
                Name: newUser.Name,
                Email: newUser.Email
            }
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

async function LoginUser(req,res){

    try{
    const { Email, Password } = req.body;

    if(!Email || !Password){
        return res.status(400).json({
            message:'All fields are required'
        });
    }

   const user = await UserModel.findOne({Email});

   if(!user){
    return res.staus(400).json({
        message:'User Not found'
    })
   }

   const isComparePassword = await bcrypt.compare(Password,user.Password);


   if(!isComparePassword){
    return res.status(401).json({
        message:"Invaild Password"
    })
   }

   const token = await jwt.sign({Email:user.Email},process.env.JWT_SECRET,{expiresIn:'7d' });

   res.cookie('token',token,{
    httpOnly:true
   })

   return res.status(200).json({ 
    message: "Login Successfully", 
    user: { 
        id: user._id, 
        Name: user.Name, 
        Email: user.Email 
    } 
   });


}catch(err){
    console.error(err);
     return res.status(500).json({
         message: "Internal Server Error"
     });

}
}

async function LogoutUser(req,res){
    try{
        res.clearCookie('token');
        return res.status(200).json({
            message:'Logout Successfully'
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({       
        message:'Internal Server Error'
        })
    }   
}

async function getUser(req,res){
    try{
        const {id} = req.params;  

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            message: "User Retrieved Successfully",
            user: {
                id: user._id,
                Name: user.Name,
                Email: user.Email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function updateUser(req,res){
    try{
        const {id} = req.params;
        const {Name,Email,Password} = req.body; 

        if(!Name || !Email || !Password){
            return res.status(400).json({
                message:'All fields are required'
            });
        }

        const user = await UserModel.findById(id);

        if (!user) {    
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const hassedpassword = await bcrypt.hash(Password, 10);

        user.Name = Name;
        user.Email = Email;
        user.Password = hassedpassword;

        await user.save();

        return res.status(200).json({
            message: "User Updated Successfully",
            user: {
                id: user._id,
                Name: user.Name,
                Email: user.Email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({       
        message: "Internal Server Error"
        });
    }

}

async function deleteUser(req,res){
    try{
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                message:'User Not Found'
            })
        }

        return res.status(200).json({
            message:'User Deleted Successfully'
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

async function ChangePassword(req,res){
    try{
        const {id} = req.params;
        const {OldPassword,NewPassword} = req.body;

        if(!OldPassword || !NewPassword){
            return res.status(400).json({
                message:'All fields are required'
            })
        }   

        const user = await UserModel.findById(id);

        if(!user){
            return res.status(404).json({
                message:'User Not Found'
            })
        }

        const isComparePassword = await bcrypt.compare(OldPassword,user.Password);

        if(!isComparePassword){

            return res.status(401).json({
                message:'Old Password is Incorrect'
            })
        }   

        const hassedpassword = await bcrypt.hash(NewPassword, 10);

        user.Password = hassedpassword; 
        await user.save();

        return res.status(200).json({
            message:'Password Changed Successfully'
        })
    }catch(err){
        console.error(err);
        res.status(500).json({ 
            message:'Internal Server Error'
        })
    }   
}

module.exports = {
    RegisterUser,
    LoginUser,
    LogoutUser,
    getUser,
    updateUser,
    deleteUser,
    ChangePassword
};
