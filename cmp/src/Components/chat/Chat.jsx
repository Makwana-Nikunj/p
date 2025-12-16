import React from 'react'
import { FiSearch } from "react-icons/fi";
import ChatCard from './ChatCard';

const Chat = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center mt-20 '>
        
        <div className='w-[85%]'>
            <p className='font-semibold text-2xl'>Messages</p>
        </div>

        <div className='w-[85%] h-[75vh] border border-gray-300 p-3 my-4 rounded flex justify-between items-start gap-4 '>

            <div className='w-[30%]' >

                <div className='w-full bg-white p-4 border border-gray-300 rounded-t '>

                    <div className='flex justify-between items-center  bg-gray-100 rounded-sm p-2 gap-4 w-full'>
               
                        <FiSearch />
                        <input
                            className="
                            w-full  
                            rounded-md
                            text-sm
                            outline-none
                            focus:outline-none
                            focus:border-gray-300
                            focus:ring-0
                            focus-visible:ring-0"
                            type="text"
                            placeholder='Search conversations' />
                   </div>

                </div>
               
        <div className="h-[450px] overflow-y-auto hide-scrollbar">
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </div>

                

            </div>
          

        

            <div className='w-[70%] h-[520px] rounded border-gray-300 border'>


                    {/* top */}
                <div className='flex justify-between p-4 border-b  border-gray-300'>

                    <div className='flex gap-4'>
        
                        <img
                        src="https://imgs.search.brave.com/NlyaZVxHZK-ltv-9ZSB-Zi_4sYslTOaP_ghUuzVBCGU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctY2lyY2xl/LXByb2ZpbGUtcGlj/dHVyZS1zdGlja2Vy/LWJ1c2luZXNzLXdv/bWFuLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmRfNTM4NzYtOTQ1/ODYzLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover border"
                        />


                        <div className='flex flex-col items-start gap-1'>
                            <p>Name</p>
                            <p className='text-xs text-gray-600'>Re : productName</p>
                        </div>

                    </div>

                    <button
                    className="text-sm font-semibold border border-gray-300 rounded-md px-4 py-2
                                transition
                                hover:bg-black hover:text-white
                                active:scale-95"
                    >
                    View Product
                    </button>

                        
                </div>

                {/* messages */}
                <div>
                    
                </div>

                    
            </div>          
        </div>
    </div>
  )
}

export default Chat 