const BlogModel = require("../models/blog.model");
const UserModel = require("../models/user.model");

async function CreateBlog(req, res) {
    try {
        const {id} =req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "User, Id, Title And Description Is Required"
            });
        }

        
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        const blog = await BlogModel.create({
            Id: id,
            Title: title,
            Discription: description
        });

        return res.status(201).json({
            message: "Blog Created Successfully",
            blog: {
                id: blog._id,
                userId: blog.Id,
                title: blog.Title,
                description: blog.Discription
            }
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getAllBlogs(req,res){
    try {
        const blogs = await BlogModel.find();

        return res.status(200).json({
            message: "Blogs Retrieved Successfully",
            blogs: blogs
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function updateblogs(req,res){
    try{
        const {id} = req.params;
        const {title, Discription} = req.body;

        console.log(id,title,Discription);

        if(!title || !Discription){
            return res.status(400).json({
                message:'Title and Discription is required'
            })
        }

        
        const blog = await BlogModel.findByIdAndUpdate(id,{
            Title:title,
            Discription:Discription
        },{new:true});

        if(!blog){
            return res.status(404).json({
                message:'Blog Not Found'
            })
        }

        return res.status(200).json({
            message:'Blog Updated Successfully',
            blog:blog
        })  

    }catch(err){
        console.error(err); 
        res.status(500).json({
            message:'Internal Server Error'
        })  
    }
}

async function deleteblogs(req,res){
    try{
        const {id} = req.params;
        const blog = await BlogModel.findByIdAndDelete(id);

        if(!blog){
            return res.status(404).json({
                message:'Blog Not Found'
            })
        }

        return res.status(200).json({
            message:'Blog Deleted Successfully'
        })  
    }catch(err){
        console.error(err); 
        res.status(500).json({
            message:'Internal Server Error'
        })  
    }
}

async function singleuserblogs(req,res){
    try{
        const {id} = req.params;
        const blogs = await BlogModel.find({Id:id});

        return res.status(200).json({
            message:'Blogs Retrieved Successfully',
            blogs: blogs
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

async function searchblogs(req,res){
    try{
        const {search} = req.query;
        const blogs = await BlogModel.find({
            $or: [
                { Title: { $regex: search, $options: 'i' } },
                { Discription: { $regex: search, $options: 'i' } }
            ]
        });

        return res.status(200).json({
            message:'Blogs Retrieved Successfully',
            blogs: blogs
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

module.exports = {
    CreateBlog,
    getAllBlogs,
    updateblogs,
    singleuserblogs,
    deleteblogs,
    searchblogs
};
