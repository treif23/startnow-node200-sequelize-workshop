const express = require('express');
const router = express.Router();
const db = require('../db/models');


router.get('/', (req, res) => {
    db.Blog
        .findAll()
        .then(blog => {
            blog
           ? res.status(200).json(blog)
           : res.status(404).send("No Blogs found.");
        });
});

router.get('/featured', (req, res) => {
    console.log({req})
    db.Blog.findAll({
            where: { featured: true }
        }).then(blog => {
            console.log({blog});
            blog
                ? res.status(200).json(blog)
                : res.status(404).send("Blogs don't exist");
        }).catch(err => console.log(err)) 
});

router.get('/:id', (req, res) => {
    console.log("woah your were right")
    db.Blog
        .findById(req.params.id)
        .then(blog => {
            blog
                ? res.status(200).json(blog)
                : res.status(404).send("No Blog with that Id exists");
        });

});


router.post('/', (req, res) => {

    req.body.authorId = req.query.authorId;
    db.Blog.create(req.body)
    .then(blog =>{
        blog
        ? res.status(201).json(blog)
        : res.status(404).send("Error creating Blog");
    });
    
});

router.put('/:id', (req, res) => {
    db.Blog
    .update(req.body,  { 
        where: { id: req.params.id }
    })
    .then(blog =>{
        blog
        ? res.status(204).json(blog)
        : res.status(404).send("Error updating blog");
    })
});

router.delete('/:id', (req,res) => {
    db.Blog
    .findById(req.params.id)
    .then(blog => {
        return blog.destroy();
    }).then(
    blog =>{
        blog
        ? res.status(200).json(blog)
        : res.status(404).send("Error, blog doesn't exist");
    });
});



//router.get('/:id')
module.exports = router;