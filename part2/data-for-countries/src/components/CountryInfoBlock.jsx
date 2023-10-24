const CountyInfoBlock = ({countryObj}) =>{
  const langCodes = Object.keys(countryObj.languages)
  const langNames = langCodes.map(code=>countryObj.languages[code])
  return(
  <>
    <h1>{countryObj.name.common}</h1>
    <p>Capital {countryObj.capital}</p>
    <p>Area {countryObj.area}</p>
    <p><strong>languages</strong></p>
    <ul>
      {langNames.map((name, index)=><li key={index}>{name}</li>)}
    </ul>
    <img src={`${countryObj.flags.svg}`} alt={`${countryObj.flags.alt}`}
    style={{maxHeight:"300px"}} />
  </>
  )
}

export default CountyInfoBlock