import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router'
import axios from 'axios';
import { generateAndSetToken, verifyToken, removeToken } from '../components/lib/utils/GenerateToken'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_id, setUserId] = useState("");
  const router = useRouter()


  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const userId = await verifyToken();
      if (userId) {
        setIsLogged(true);
        setUserId(userId);
      } else {
        setIsLogged(false);
      }
      setLoading(false);
    };

    checkUser();
  }, [verifyOtp]);


  const loginUser = async (driver_mobile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('driver_mobile', driver_mobile);
      const response = await axios.post('https://happinesscarrental.com/admin/users/sendotp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.data.status == false) throw new Error(response.data.message);
      return response.data.otp;
    } catch (error) {
      if (error.message && error.message.includes('Mobile number not found')) {
        alert('Mobile number not found , Sign Up first.');
        return false;
      }
      console.log(error.message)
      return false;
    } finally {
      setLoading(false);
    }
  };


  const signUpUser = async (driver_mobile, referral_code) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('driver_mobile', driver_mobile);
      if (referral_code !== '') formData.append('referral_code', referral_code);
      const response = await axios.post('https://happinesscarrental.com/admin/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status == false) throw new Error(response.data.message);
      return response.data.otp;
    } catch (error) {
      if (error.message && error.message.includes('The Mobile Number field must contain a unique value.')) {
        alert('Mobile number already exists.');
        return false;
      }
      console.log(error.message)
      return false;
    } finally {
      setLoading(false);
    }
  };


  const verifyOtp = async (driver_mobile, otp) => {
    try {
      const formData = new FormData();
      formData.append('driver_mobile', driver_mobile);
      formData.append('otp', otp);
      const response = await axios.post('https://happinesscarrental.com/admin/users/verify_otp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status == false) throw new Error(response.data.message);

      const result = await generateAndSetToken(driver_mobile, response.data.driver_id);
      if (!result) return false;
      setIsLogged(true);
      alert('OTP verified successfully!');
      router.navigate('/HomeScreen');
      return true;
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      router.navigate('/LoginScreen')

    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await removeToken();
    setIsLogged(false);
    setUserId("");
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        isLogged,
        loginUser,
        signUpUser,
        verifyOtp,
        logoutUser,
        user_id,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


