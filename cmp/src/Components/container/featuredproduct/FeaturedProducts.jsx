import React from 'react'
import Cart from './ItemCard'
const FeaturedProducts = () => {

  const items = [
  {
    imgUrl: "https://imgs.search.brave.com/wceSXHNO89HukueItWgUk4R0kp2S58bRpiJYxzuvamg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/NjgzOTc1Ni9waG90/by93aXJlbGVzcy1i/bHVldG9vdGgtaGVh/ZHBob25lcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9bFZR/SDd5R3dtU1hvbU1Q/eGtDRmVXTkVUTzJZ/ejRhMHJSLWRZdi1t/aVQyVT0",
    category: "Electronics",
    name: "Wireless Headphones",
    price: "2999",
  },
  {
    imgUrl: "https://imgs.search.brave.com/fCG1r33qwvtHP7oVtipgGV7B1xooZ5oyp_eLuA8rtbM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMubmlrZS5jb20v/YS9pbWFnZXMvdF93/ZWJfcHdfNTkyX3Yy/L2ZfYXV0by9kNzZi/ODkwYS0zNzRlLTQz/OGUtYjUwNC1kNDRi/ZjliYjk0OWYvTStO/SytUQ0grRkxDK0hP/T0RJRS5wbmc",
    category: "Fashion",
    name: "Men's Hoodie",
    price: "1499",
  },
  {
    imgUrl: "https://imgs.search.brave.com/9djizEMTJ8L9o3BUbYXBrMY46LTQK3KaYt8y_JT-n4k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NjIxODMyNDEtYjkz/N2U5NTU4NWI2P2Zt/PWpwZyZxPTYwJnc9/MzAwMCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE0zeDhjblZ1Ym1s/dVp5VXlNSE5vYjJW/emZHVnVmREI4ZkRC/OGZId3c",
    category: "Footwear",
    name: "Running Shoes",
    price: "3999",
  },
  {
    imgUrl: "https://imgs.search.brave.com/3ybUazezltGKBmP_uH87jHyhskzJ1GCsvnKjs3k-svA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/bWFya2V0aW5nLWNt/cy9hc3NldHMvaW1h/Z2VzL2UzLzNmLzBk/NjBmMjA3NGZmZWE1/ZDYyMjVkZjY0NjEy/YjUvY2FsbS0yeC5w/bmc9bi13NTYyLWg0/MDctZmNyb3A2ND0x/LDA0NWUwMDAwZmJh/MmZmZmYtcnc",
    category: "Accessories",
    name: "Smart Watch",
    price: "5499",
  },
  {
    imgUrl:"https://imgs.search.brave.com/Z55J3MOZdlkeBKwShE345tVfeSj2GDs6WX7p3xXBaVk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmlsa2FtYWxob21l/cy5jb20vY2RuL3No/b3AvZmlsZXMvTktM/XzA3MDhfMS5qcGc_/dj0xNzEwMTUwNDM2/JndpZHRoPTQ2MA",
    category: "Home",
    name: "Decor Lamp",
    price: "1999",
  },
];

  return (
    <div className='w-[90%] mt-4'>
        {/* top */}

        <div className='flex items-center justify-between'>

            <span className='text-xl font-semibold'>Featurd Products </span>

          <button
            className="
              border border-gray-300 
              px-4 py-2 
              rounded-lg 
              font-semibold 
              transition-all 
              duration-300 
              ease-in-out
              hover:bg-black 
              hover:text-white 
              hover:border-black
              active:scale-95
            "
          >
  View All
</button>


        </div>

        {/* bottom */}

        <div className='mt-6 p-2 flex justify-center items-center gap-4 flex-wrap'>

            {/* cards */}

            {items.map((item,index) => (
              
              <Cart
                 key={index}
                imgUrl={item.imgUrl}
                category={item.category}
                name={item.name}
                price={item.price}
             />

              
            ))}
           

        </div>
    </div>
  )
}

export default FeaturedProducts  