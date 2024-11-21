import { useEffect, useState } from 'react'
import { Contact } from '../interfaces'

export const useFilterSearch = (contacts: Contact[]) => {
    const [query, setQuery] = useState('')
    const [filtered, setFiltered] = useState<Contact[]>(contacts)

    useEffect(() => {
      const filtered = contacts.filter((contact: Contact) => 
        contact.name.toLowerCase().includes(query.toLowerCase()))
      setFiltered(filtered)
    }, [query, setQuery])

  return { filtered, setQuery }
}
