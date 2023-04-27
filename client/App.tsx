import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";
import HeaderDrawer from './components/Header/HeaderDrawer'
import Home from './views/Home'
import Video from "./views/Video";

export default function App() {

  return (
    <>
    <Router>
        <Routes> 
          <Route path='/' element={<HeaderDrawer props={<Home />} />} />
          <Route path='/video' element={<HeaderDrawer props={<Video />} />} />
        </Routes>
      </Router>
    </>
  )
}
