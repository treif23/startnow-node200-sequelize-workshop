const express = require('express');
const router = express.Router();
const db = require('../db/models/index');


router.get('/', (req, res) => {
    db.Author.findAll().then(author => {
            author
                ? res.status(200).json(author)
                : res.status(404).send("No Authors found.");
        });
});

router.get('/:id', (req, res) => {
    db.Author
        .findById(req.params.id)
        .then(author => {
            author
                ? res.status(200).json(author)
                : res.status(404).send("No Author with that Id exists");
        });

});

router.get('/:id/blogs', (req, res) => {
    db.Blog
        .findAll({
            where: {
                authorId: req.params.id
            }
        })
        .then(blogs => {
            blogs
                ? res.status(200).json(blogs)
                : res.status(400).send("No blog with that Author Id exists");
        })
});

router.post('/', (req, res) => {
    db.Author.create(req.body).then(author =>{
        author
        ? res.status(201).json(author)
        : res.status(400).send("Error creating Author");
    })
    
});

router.put('/:id', (req, res) => {
    console.log("=====================================================================================")
    db.Author
    .update(req.body,  { 
        where: { id: req.params.id }
    })
    .then(author =>{
        author
        ? res.status(204).json(author)
        : res.status(404).send("Error updating Author");
    })
});

router.delete('/:id', (req,res) => {
    db.Author
    .findById(req.params.id)
    .then(author => {
        return author.destroy();
    }).then(
    author =>{
        author
        ? res.status(200).json(author)
        : res.status(400).send("Error, Author doesn't exist");
    });
});


module.exports = router;