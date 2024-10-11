import React, { useState, useEffect } from "react";


import Countries from "./components/Countries";

import "./App.css"
import Search from "./components/Search";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries , setFillteredCountries] = useState(countries); 

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFillteredCountries(data); 
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error); 
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) =>{
    const filter = filteredCountries.filter((country) => country.name.common !== name); 
    setFillteredCountries(filter)
  }

  const handleSearch =(e)=>{
    let value = e.toLowerCase(); 
    const newCountry = countries.filter((country) =>{
      const countryName = country.name.common.toLowerCase(); 
      return countryName.startsWith(value); 
    }); 
    setFillteredCountries(newCountry)
  }

  return (
    <div>
      <h1>Country App</h1>
      <Search onSearch={handleSearch}/>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && <Countries countries={filteredCountries} 
      onRemoveCountry = {handleRemoveCountry} />}
    </div>
  );
}

export default App;
