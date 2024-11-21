import { useState } from 'react'
import { User } from '../interfaces/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const useUsers = () => {
    const [user, setUser] = useState<User[]>() 

    const get = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken')
            const res = await axios.get('link', 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setUser(res.data)
        } catch (error) {
            console.error('Failed to load user', error)
        }
    }

    const createUpdate = async (user: User) => {
        try {
            const token = AsyncStorage.getItem('authToken')

            if(user.id) {
                await axios.patch(`https://close-to-you-backend.onrender.com/api/${user.id}`, user, {
                    headers: { Authorization: `Bearer ${token}` } 
                })
            } else{
                await axios.post('https://close-to-you-backend.onrender.com/api/', user)
            }
        } catch (error) {
            console.error('Failed to create or update user:', error)
        }
    }

    const deleteUser = async (id: string) => {
        try {
            const token = AsyncStorage.getItem('authToken')
            await axios.delete(`https://close-to-you-backend.onrender.com/api/${id}`, {
                headers: { Authorization: `Bearer ${token}` } 
            })
        } catch (error) {
            console.error('Failed to delete user:', error)
        }
    }

    return { user, get, createUpdate, deleteUser }
}
