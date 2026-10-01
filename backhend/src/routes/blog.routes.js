const express = require('express');
const BlogController = require('../controllers/blog.controller');

const router = express.Router();

router.post('/create-blog/:id',BlogController.CreateBlog);
router.get('/get-all-blogs',BlogController.getAllBlogs);
router.put('/update-blog/:id',BlogController.updateblogs);
router.delete('/delete-blog/:id',BlogController.deleteblogs);
router.get('/get-user-blogs/:id',BlogController.singleuserblogs);
router.get('/search-blogs',BlogController.searchblogs);

module.exports = router;