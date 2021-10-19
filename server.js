const express = require("express");
const {animals} = require("./data/animals.json");
const PORT = process.env.PORT || 3001;
const app = express();


const filterByQuery = (query, animalsArray) => {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if(query.personalityTraits){
        //save personalityTraits as an array, if personalityTraits 
        //is a string place it in a new array
        if(typeof query.personalityTraits === "string"){
            personalityTraitsArray = [query.personalityTraits];
        }
        else{
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait
        personalityTraitsArray.forEach(trait => {
            //filter trait through each animal in the filtered results 
            //array to once the loop is complete only animals with the 
            //traits are in the array
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray){
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result
}

app.get("/api/animals", (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

//param route must come after the prevois GET route
app.get("/api/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if(result){
        res.json(result);
    }
    else{
        res.send(404);
    }
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});