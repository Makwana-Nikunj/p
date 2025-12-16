import React from 'react'

const ChatCard = () => {
  return (
   <div className='flex w-full h-25 justify-between border border-gray-300 p-4'>
                    <div className='flex gap-4'>
                        <img
                     src="https://imgs.search.brave.com/NlyaZVxHZK-ltv-9ZSB-Zi_4sYslTOaP_ghUuzVBCGU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctY2lyY2xl/LXByb2ZpbGUtcGlj/dHVyZS1zdGlja2Vy/LWJ1c2luZXNzLXdv/bWFuLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmRfNTM4NzYtOTQ1/ODYzLmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
                     alt="profile"
                     className="w-15 h-15 rounded-full object-cover border"
                       />


                    <div className='flex flex-col items-start gap-1'>
                        <p>Name</p>
                        <p className='text-sm text-gray-700'>message</p>
                        <p className='text-xs text-gray-600'>Re : productName</p>
                    </div>

                    </div>
                    

                    <p className='text-xs '>time ago</p>
                </div>

  )
}

export default ChatCard 