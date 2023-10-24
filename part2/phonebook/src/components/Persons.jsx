const Persons = ({persons,filter, handler}) =>{
  console.log(filter)
  return(
    <>
      {persons
        .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
        .map(x => <p key={x.name}>{x.name} {x.number}
              <button onClick={() => handler(x.name)}>delete</button></p>)}
    </>
  )
}

export default Persons