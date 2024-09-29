
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Data from "./components/Data"



export default function App() {
  return (
   <div>

<BrowserRouter>
    <Routes>
       <Route path="/data" element={<Data/>} />
    </Routes>
</BrowserRouter>

   </div>
  )
}