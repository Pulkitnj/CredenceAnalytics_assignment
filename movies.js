const { movies } = require("./db")
const { Router } = require("express");
const router = Router();

//Performing CRUD operations on the movies collection
//CRUD - Create, Read, Update, Delete
//First need to verify user input data using Zod or manual validation for big projects.

//Create
router.post("/create", async (req, res) => {
    const { name, img, summary } = req.body;
    try {
        const newMovie = await movies.create({
            name,
            img,
            summary
        });
        res.status(201).json({
            message: "Movie created successfully",
            movie: newMovie
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message: "Failed to create movie"
        });
    }
});


//Read
router.get("/read", async (req, res) => {
    try {
        const response = await movies.find({});
        res.status(200).json({
            movies: response
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Failed to fetch movies"
        });
    }
});


//Update
router.put("/update", async (req, res) => {
    const name = req.body.name;
    //Standard way is to pass params or query in the URL but in that need to use %20 for spaces and we have many spaces
    const { img, summary } = req.body;
    try {
        const updatedMovie = await movies.findOneAndUpdate({ name }, { img, summary });
        if (updatedMovie) {
            res.status(200).json({
                message: "Updated",
                movie: updatedMovie
            });
        } else {
            res.status(404).json({
                message: "Movie not found"
            });
        }
    } 
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Failed to update"
        });
    }
});


//Delete
router.delete("/delete", async (req, res) => {
    const name = req.body.name;
    try {
        const deletedMovie = await movies.findOneAndDelete({ name });
        if (deletedMovie) {
            res.status(200).json({
                message: "Deleted",
                deletedMovie
            });
        } else {
            res.status(404).json({
                message: "Movie not found"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Failed to delete"
        });
    }
});


module.exports = router;