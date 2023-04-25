import HeaderDrawer from './components/Header/HeaderDrawer'
import Home from './views/Home'

export default function App() {

  return (
    <>
    <HeaderDrawer props={<Home />} />
    </>
  )
}
