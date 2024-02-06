import { useState, useEffect } from 'react'
import Form from './components/Form'
import Contact from './components/Contact'
import Search from './components/Search'
import contactService from './services/contactService'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const addContact = e => {
    e.preventDefault();
    const sameNameContact = 
    contacts.find(c => c.name.toLowerCase() === newName.toLowerCase())
    if (sameNameContact) {
      updateContact(sameNameContact)
      return
    }
    const newContactObj = { name: newName, number: newNumber }
    contactService
    .create(newContactObj)
    .then(newContact => {
      setContacts(contacts.concat(newContact))
      setMessage(`Added contact ${newContact.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
  }
  
  const updateContact = contact => {
    if (window.confirm(`${contact.name}'s already in your contacts. Replace old ph# ?`)) {
      const changeContactNumber = { ...contact, number: newNumber }
      contactService.updateNumber(changeContactNumber.id, changeContactNumber)
      .then(updatedContact => {
        setContacts(
          contacts.map(c => c.id !== contact.id ? c : updatedContact))
        setMessage(`Updated contact ${contact.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setIsError(false)
        setNewName('')
        setNewNumber('')
      })
      .catch( () => {
        setContacts(contacts.filter(c => c.id !== contact.id))
        setMessage(`${contact.name} has already been deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setIsError(true)
      })
    }
  }

  const deleteContact = contact => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      contactService.deleteContact(contact.id)
      .then(deletedContact => {
        setContacts(contacts.filter(c => c.id !== deletedContact.id))
      })
      .catch(() => {
        setContacts(contacts.filter(c => c.id !== contact.id))
        setMessage(`${contact.name} has already been deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setIsError(true)
      })
    }  
  }

  const contactsToShow = search ? contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()))
  : contacts

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Search name={search} onChange={e => setSearch(e.target.value)}/>
      <Form onSubmit={addContact} newName={newName} newNumber={newNumber}
      onNameChange={e => setNewName(e.target.value)}
      onNumberChange={e => setNewNumber(e.target.value)}/>
      <h2>Numbers</h2>
      {contactsToShow.map(c => 
      <Contact key={c.name} contact={c} onClick={() => deleteContact(c)}/>)}
    </div>
  )
}

export default App