const PersonForm = ({newName, newNumber, handleNewName, handleNewNumber, handleSetPersons}) =>{
  return(
    <form onSubmit={handleSetPersons}>
        <div>
          <label>name: <input value={newName} onChange={handleNewName}/></label>
        </div>
        <div>
          <label>number: <input value={newNumber} onChange={handleNewNumber}/></label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm