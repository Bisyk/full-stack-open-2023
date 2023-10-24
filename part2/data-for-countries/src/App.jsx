import { useEffect, useState } from "react"
import countriesServices from "./services/countries"
import CountyInfoBlock from "./components/CountryInfoBlock";
import CountryItem from "./components/CountryItem";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryToFind, setCountryToFind] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(()=>{
    countriesServices
    .getAll()
    .then(response => {
      setCountries(response.data);
    });
}, []);

  useEffect(()=>{
    setCountriesToShow(countries.filter(x => x.name.common.toLowerCase().includes(countryToFind.toLowerCase())))
  }, [countryToFind])

  const handleTextInput = (e) =>{
    setCountryToFind(e.target.value)
  }
  
  const handleCountryChose = name =>{
    const updatedCountriesToShow = countriesToShow.filter(x => x.name.common === name)
    setCountriesToShow(updatedCountriesToShow)
  }

  return (
    <>
      <label>
        Find countries
        <input type="text" onChange={handleTextInput}/>
      </label><br/>
      {countriesToShow.length === 1 ? <CountyInfoBlock countryObj={countriesToShow[0]}/> 
      : countriesToShow.length < 10 ? countriesToShow.map(country => <CountryItem name={country.name.common} key={country.ccn3} handleClick={handleCountryChose}/>) 
      : "too many values, specify filter"}
    </>
  )
}

export default App