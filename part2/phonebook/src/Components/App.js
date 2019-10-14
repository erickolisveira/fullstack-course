import React, { useState, useEffect } from 'react'
import phoneService from '../services/phones';

const Title = ({ title }) => 
   <h2>{title}</h2>

const Person = (props) =>
   <div>{props.name} {props.number}</div>

const Persons = ({ persons }) =>
   persons.map(person =>
      <Person
         key={person.id}
         name={person.name}
         number={person.number} />
   )

const Filter = (props) =>
   <div>
      Filter shown with
      <input
         onChange={props.handleFindChange}
         value={props.search} />
   </div>

const PersonForm = (props) => {
   const { nameChange, phoneChange, formSubmit, name, number } = props;
   return (
      <form onSubmit={formSubmit}>
         <div>
            Name: <input onChange={nameChange} value={name} />
         </div>
         <div>
            Number: <input onChange={phoneChange} value={number} />
         </div>
         <div>
            <button type="submit">Add</button>
         </div>
      </form>
   );
}

const App = () => {
   const [persons, setPersons] = useState([]);
   const [newPerson, setNewPerson] = useState({
      name: '',
      number: ''
   });
   const [search, setSearch] = useState('');

   const clearFields = () => {
      setNewPerson({
         name: '',
         number: ''
      });
   }

   const getData = () => {
      phoneService
         .getAll()
         .then(persons => {
            setPersons(persons);
         });
   }
   useEffect(getData, []);

   const addPerson = () => {
      phoneService
         .create(newPerson)
         .then(phoneRetrieved => {
            setPersons(persons.concat(phoneRetrieved));
            clearFields();
         });
   }

   useEffect(getData, []);

   const handleFindChange = (event) =>
      setSearch(event.target.value);

   const handleNameChange = (event) =>
      setNewPerson({ ...newPerson, name: event.target.value });

   const handleNumberChange = (event) =>
      setNewPerson({ ...newPerson, number: event.target.value });

   const handleFormSubmit = (event) => {
      event.preventDefault();
      persons.find(person => person.name === newName)
         ? alert(`${newName} is already added to phonebook`)
         : addPerson();
      setNewName('');
      setNewNumber('');
   }

   const personsToShow = search === '' ? persons :
      persons.filter(person =>
         person.name.toLowerCase()
            .includes(search.toLowerCase()));

   return (
      <div>
         <Title title='Phonebook' />
         <Filter handleFindChange={handleFindChange}
            search={search} />
         <Title title='Add a new' />
         <PersonForm nameChange={handleNameChange}
            numberChange={handleNumberChange}
            formSubmit={handleFormSubmit}
            newPerson={newPerson} />
         <Title title="Numbers" />
         <Persons persons={personsToShow}
            handleDelete={deletePerson} />
      </div>
   )
}

export default App;