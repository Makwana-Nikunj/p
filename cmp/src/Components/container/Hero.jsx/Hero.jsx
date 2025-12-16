import React from 'react'
import { Sparkles } from 'lucide-react'   // ✅ missing import

const Hero = () => {
  return (
     

     <div className='w-full flex justify-around items-center '>


        <div className="h-30 w-[90%] bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
       
            
            <div className='flex items-start gap-4'>

              <Sparkles className="w-8 h-8 flex-shrink-0 mt-1" />

             <div>

                <h1 className="text-2xl font-semibold mb-2 flex gap-2">

               
                Welcome to Campus Marketplace!
                </h1>

                <p className="text-white/90">
                   Discover great deals from fellow students. Buy, sell, and connect with your campus community.
                </p>

             </div>

            </div>

           
              
           
      </div>


            
    </div>

    
    

    
  )
}

export default Hero
