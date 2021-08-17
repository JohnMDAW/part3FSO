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

let newPerson = {
    id : Math.round(Math.random() * 1000), 
    name : "John",
    number : "req.body.number"
}

persons.push(newPerson)

persons.forEach( person => console.log(`id : ${person.id}
                                        name: ${person.name}
                                        number: ${person.name}
`))