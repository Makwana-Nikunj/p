import Header from "./Components/Header/Header"
import Container from "./Components/container/Container"
import Footer from "./Components/Footer/Footer"



function App() {
 

  return (
    <>
    <div className="h-screen w-full  flex flex-col justify-between ">

      <div>
         <Header />
         <Container  />
      </div>

     <Footer />

    </div>
     
    </>
  )
}

export default App
