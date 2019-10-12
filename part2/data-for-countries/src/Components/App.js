import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';

const SearchField = ({ onChange, state }) =>
   <div>
      Find countries <input onChange={onChange} value={state} />
   </div>

const App = () => {
   const [searchField, setSearchField] = useState('braz');
   const [countries, setCountries] = useState([]);

   const handleSearchFieldChange = (e) =>
      setSearchField(e.target.value);

   useEffect(() => {
      axios.get("https://restcountries.eu/rest/v2/all")
         .then(response =>
            setCountries(response.data))
   }, []);

   const countriesToShow = searchField === ''
      ? countries
      : countries.filter(country => country.name.toLowerCase().includes(searchField.toLowerCase()));

   return (
      <div>
         <SearchField onChange={handleSearchFieldChange}
            value={searchField} />
         <div>
            <Countries countries={countriesToShow} />
         </div>
      </div>
   );
}

export default App;
