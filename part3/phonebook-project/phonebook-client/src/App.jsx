import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'
import { Notification } from './components/Notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationStatus, setNotificationStatus] = useState(null)
  const [lastModifiedPerson, setLastModifiedPerson] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    personsServices
      .getAll()
      .then(response =>{
        setPersons(response.data)
      })
  }, [])

  useEffect(()=>{
    personsServices
      .getAll()
      .then(response=>{
        setPersons(response.data)
      })
  }, [lastModifiedPerson])

  function containsObject(object, list){
    for (let i = 0; i < list.length; i++){
      if (JSON.stringify(object.name) === JSON.stringify(list[i].name)){
        return true;
      }
    }
    return false;
  }

  function findPersonIdByName(name, arr){
    return arr.find(x => x.name === `${name}`).id
  }

  const handleNewName = (event) =>{
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) =>{
    setFilter(event.target.value)
  }

  const handleSetPersons = (event) =>{
    event.preventDefault()
    console.log(persons)
    const updatedPersons = [...persons]
        if (!containsObject({name: newName, number: newNumber}, updatedPersons)){
          const newPerson = {name: newName, number: newNumber}
          updatedPersons.push(newPerson)
          setPersons(updatedPersons)
          personsServices
            .create(newPerson)
            .catch(error => {
              setNotificationStatus('validationError')
              setError(error.response.data.error)
              setTimeout(()=>{
              setNotificationStatus(null)
              setError(null)
            }, 5000)
            })
            setLastModifiedPerson(newPerson)
    setNotificationStatus('success')
      setTimeout(() => {
        setNotificationStatus(null)
      }, 5000);
        } else {
          if (window.confirm(`${newName} is already added to phonebook, replace the number with new one?`)){
            const newPerson = {name: newName, number: newNumber}
            const personToUpdateId = findPersonIdByName(newPerson.name, persons)
            updatedPersons.push(newPerson)
            setPersons(updatedPersons)
            personsServices
              .update(personToUpdateId, newPerson)
              .catch(error => {
                setNotificationStatus('validationError')
                setError(error.response.data.error)
                setTimeout(()=>{
                setNotificationStatus(null)
                setError(null)
              }, 5000)
              })
              setLastModifiedPerson(newPerson)
              setNotificationStatus('success')
              setTimeout(() => {
                setNotificationStatus(null)
              }, 5000);
          }
          
        }
      setNewName('')
      setNewNumber('')
    }

    const handleDeletePersons = (name) =>{
      if (window.confirm(`Delete ${name}?`)) {
        const updatedPersons = [...persons]
        const personToDeleteId = findPersonIdByName(name, updatedPersons)
        setPersons(updatedPersons.filter(x => x.id !== personToDeleteId))
        personsServices
          .deletePerson(personToDeleteId)
          .catch(error =>{
            console.log('error catched')
            setLastModifiedPerson({name: name, number: null})
            setNotificationStatus('alreadyDeleted')
            setTimeout(()=>{
              setNotificationStatus(null)
            }, 5000)

          })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={lastModifiedPerson.name} notificationStatus={notificationStatus} error={error}/>
      <Filter handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} 
                  handleNewName={handleNewName} handleNewNumber={handleNewNumber} 
                  handleSetPersons={handleSetPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handler={handleDeletePersons}/>
    </div>
  )
}
export default App