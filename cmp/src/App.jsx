import Header from "./Components/Header/Header"
import Container from "./Components/container/Container"
import Footer from "./Components/Footer/Footer"
import Browse from "./Components/browse/Browse"
import Profile from "./Components/profile/Profile"
import Chat from "./Components/chat/Chat"

function App() {
 

  return (
    <>
    <div className="h-screen w-full  flex flex-col justify-between ">

       <Header />

     
        
         {/* <Container  /> */}
      
        {/* <Browse /> */}

        {/* <Profile /> */}

        <Chat />
        

     <Footer />

    </div>
     
    </>
  )
}

export default App
