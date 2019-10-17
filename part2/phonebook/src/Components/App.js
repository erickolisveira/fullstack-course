import React, { useState, useEffect } from 'react'
import phoneService from '../services/phones';
import Notification from './Notification';

const Title = ({ title }) =>
   <h2>{title}</h2>

const Person = ({ name, number, handleDelete }) =>
   <div>
      {name} {number}
      <button onClick={handleDelete}>delete</button>
   </div>

const Persons = ({ persons, handleDelete }) =>
   persons.map(person =>
      <Person
         key={person.name}
         name={person.name}
         number={person.number}
         handleDelete={() => handleDelete(person)}
      />
   )

const Filter = (props) =>
   <div>
      Filter shown with
      <input
         onChange={props.handleFindChange}
         value={props.search} />
   </div>

const PersonForm = (props) => {
   const { nameChange, numberChange, formSubmit, newPerson } = props;
   return (
      <form onSubmit={formSubmit}>
         <div>
            Name: <input onChange={nameChange} value={newPerson.name} />
         </div>
         <div>
            Number: <input onChange={numberChange} value={newPerson.number} />
         </div>
         <div>
            <button type="submit">Add</button>
         </div>
      </form>
   );
}

const App = () => {
   const [persons, setPersons] = useState([]);
   const [newPerson, setNewPerson] = useState({ name: '', number: '' });
   const [search, setSearch] = useState('');
   const [notification, setNotification] = useState({message: null, isError: null});

   const createNotification = (message, timeout, isError) => {
      setNotification({message, isError});
      setTimeout(() => {
         setNotification({message: null, isError: null});
      }, timeout);
   }

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
            createNotification(`Added ${phoneRetrieved.name} to your phonebook`, 3000, false);
         });
   }

   const deletePerson = (person) => {
      if (window.confirm(`${person.name} will be deleted. Proceed?`)) {
         phoneService.remove(person.id);
         setPersons(persons.filter(p => p.id !== person.id))
      }
   }

   const handleFindChange = (event) =>
      setSearch(event.target.value);

   const handleNameChange = (event) =>
      setNewPerson({ ...newPerson, name: event.target.value });

   const handleNumberChange = (event) =>
      setNewPerson({ ...newPerson, number: event.target.value });

   const handleFormSubmit = (event) => {
      event.preventDefault();
      let found = persons.find(person => person.name === newPerson.name);
      if(found) {
         let response = window
         .confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`);
         if(response) {
            const changedPerson = {
               name: found.name,
               number: newPerson.number
            }
            phoneService.update(found.id, changedPerson)
            .then(updatedPerson => {
               setPersons(persons
                  .map(person => person.id !== updatedPerson.id 
                     ? person : updatedPerson))
               clearFields();
            });
         }
      } else {
         addPerson();
      }
   }

   const personsToShow = search === '' ? persons :
      persons.filter(person =>
         person.name.toLowerCase()
            .includes(search.toLowerCase()));

   return (
      <div>
         <Title title='Phonebook' />
         <Notification message={notification.message} 
            isError={notification.isError} />
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