import React from "react";
import { FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import authService from '../../../services/authService'
import {logout} from '../../../store/authSlice'


const Logout = () => {

  const navigate = useNavigate()
  
   const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
             navigate("/")
        })
    }
  

  

  return (
    <button
      onClick={logoutHandler}
      className="flex justify-evenly items-center gap-2 h-10 w-25 px-3 py-2 
                 rounded-lg 
                 font-semibold 
                 border-gray-300 border
                 transition-all 
                 duration-300 
                 ease-in-out
                 hover:bg-black 
                 hover:text-on-surface
                 cursor-pointer
                 active:scale-95"
    >
      <FiLogOut size={16} />
      Logout
    </button>
  );
};

export default Logout;
