const express = require('express')
const app = express()



app.get('/', (req, res) =>{
    res.send("<h1>Phonebook application</h1>")
})

// 3.1: Phonebook backend step1
// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

let persons = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//  3.2: Phonebook backend step2
// Implement a page at the address http://localhost:3001/info that looks roughly like this:
// The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

app.get('/info', (req, res) => {
    let date = new Date
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date.toString()}</p>`)
})

// 3.3: Phonebook backend step3
// Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

// If an entry for the given id is not found, the server has to respond with the appropriate status code.
app.get('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id)
    let phonebookEntry = persons.find( person => person.id === id)

    if(!phonebookEntry){
        res.statusMessage = `Cannot find person with id ${id}`;
        return res.status(404).end()
    }
    res.json(phonebookEntry)
})



const PORT = 3001
app.listen(PORT, (req, res) =>{
    console.log(`Server is listening on port ${PORT}`)
})