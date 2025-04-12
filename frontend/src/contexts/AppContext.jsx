import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [doctors,setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData,setUserData] = useState(false);
  const getDoctorsData = async () => {
    try {
      const {data} = await axios.get(BACKEND_URL + '/api/doctor/list')
      if(data.success) {
        setDoctors(data.doctors)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserProfile = async () => {
    try {
      const {data} = await axios.get(BACKEND_URL + '/api/user/get-profile', {headers:{token}})
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getDoctorsData();
  },[])

  useEffect(()=> {
    if(token) {
      getUserProfile();
    } else {
      setUserData(false)
    }
  },[token])

  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    BACKEND_URL,
    token,
    setToken,
    userData,
    setUserData,
    getUserProfile
  }
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
