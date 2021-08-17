const { json } = require('express')
const express = require('express')
const app = express()
var morgan = require('morgan')

// Configure morgan token to show data
morgan.token('data', (req, res) => {
    return req.method == 'POST'
        ? JSON.stringify(req.body)
        : null
  })

// Using the middleware json parser
app.use(express.json())
// Use middleware Morgan, configure the logger response
app.use(morgan(':date :method :url :status :response-time[3] ms :data'))

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


// 3.4: Phonebook backend step4
// Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

// Test that your functionality works with either Postman or the Visual Studio Code REST client.
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter( entry => entry.id !== id)
    
    res.json(persons)

})


// 3.5: Phonebook backend step5
// Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
// Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.
let generateId = () => {
    let id = Math.round(Math.random() * 1000)
    // Figure out if id generated is inside the array persons
    const usedIds = persons.map(person => person.id)

    while(usedIds.find(usedId => usedId === id)){
        id = Math.round(Math.random() * 1000)
    }

    return id
}

app.post('/api/persons', (req, res) => {
    let newEntry = {
        id : generateId(), 
        name : req.body.name,
        number : req.body.number
    }

    if(!req.body.name || !req.body.number){
        res.statusMessage = "No Name or Number"
        return res.status(400).json({
            error: "Missing name or nummber"
        })
    }
    else if(persons.find(entry => entry.name.toLowerCase() === req.body.name.toLowerCase())){
        res.statusMessage = "Duplicated id"
        return res.status(400).json({
            error: "Duplicated id"
        })
    }

    persons.push(newEntry);

    res.send(persons)

})



const PORT = 3002
app.listen(PORT, (req, res) =>{
    console.log(`Server is listening on port ${PORT}`)
})