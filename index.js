const express = require("express");
const shortid = require("shortid")

const server = express();

server.use(express.json());

let users = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
];

server.post("/api/users", (req, res) => {
    const newUser = req.body;

    newUser.id = shortid.generate();

    if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    } else {
        users.push(newUser)

        res.status(201).json(newUser)
    }   

    if(users.includes(newUser) === false){
        res.status(500).json({errorMessage: "There was an error saving to the database"})
    }
})


server.get("/api/users", (req, res) => {
    if (users){
        res.status(200).json(users)
    } else {
        res.status(500).json({errorMessage: "users cannot be found"})
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const find = users.find(f => f.id === id)

    if(find){
        res.status(200).json(find)
    } else if (!find ) {
        res.status(404).json({errorMessage:"The user with the specified ID does not exist"})
    } else {
        res.status(500).json({errorMessage: "The user information could not be retrieved"})
    }
})


const PORT = 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`))