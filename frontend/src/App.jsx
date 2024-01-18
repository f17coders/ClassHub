// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/community' element={<Community/>} />
        <Route path="/community/detail" element={<CommunityDetail/>}/>
        <Route path='*' element={<div>없는 페이지에요</div>}/>
      </Routes>
    </div>
  )
}
export default App
