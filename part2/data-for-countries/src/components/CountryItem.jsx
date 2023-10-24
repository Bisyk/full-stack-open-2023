const CountryItem = ({name, key, handleClick}) =>{
  return(
    <>
      <p key={key} 
         style={{display: "inline-block"}}>
         {name}
      </p><button onClick={()=>{handleClick(name)}
      }>show</button><br/>
    </>
  )
}

export default CountryItem;