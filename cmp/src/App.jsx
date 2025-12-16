import Header from "./Components/Header/Header"
import Container from "./Components/container/Container"
import Footer from "./Components/Footer/Footer"
import Browse from "./Components/browse/Browse"


function App() {
 

  return (
    <>
    <div className="h-screen w-full  flex flex-col justify-between ">

       <Header />

     
        
         {/* <Container  /> */}
      
        <Browse />
        

     <Footer />

    </div>
     
    </>
  )
}

export default App
