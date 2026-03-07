import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import LoadingSpinner from "./Components/LoadingSpinner"

import { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { fetchProducts } from "./store/productSlice";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import profileService from './appwrite/profileService'




function App() {



const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
  authService.getCurrentUser()
    .then((user) => {
      if (user) {
        const photoUrl = profileService.getProfilePhoto(user.$id);
         dispatch(
            login({
              userData: user,
              profilePhoto: photoUrl,
            })
          );   // ✔ correct login
      } else {
        dispatch(logout());      // ✔ guest mode
      }
    })
    .finally(() => {
      dispatch(fetchProducts()); // ✔ fetch products AFTER auth is resolved
      setLoading(false);
    });
}, []);

 

   



 

  return  !loading ? (
    <>
    <div className="h-screen w-full  flex flex-col justify-between ">

       <Header />

        <main className="grow pt-16 md:pt-16">
  <Outlet />
</main>

     
        
         {/* <Container  /> */}
      
        {/* <Browse /> */}

        {/* <Profile /> */}

      
        

     <Footer />

    </div>
     
    </>
  ) : <LoadingSpinner fullScreen />
}

export default App
