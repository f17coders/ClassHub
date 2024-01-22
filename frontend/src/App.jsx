// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommunityWrite from './pages/Community/CommunityWrite'
import StudyRoom from './pages/StudyRoom/StudyRoom'
import Lecture from './pages/Lecture/Lecture'
import LectureDetail from './pages/Lecture/LectureDetail'

function App() {

  return (
    <div>
      <Navbar/>
      <div style={{minHeight: '550px'}}>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/lecture' element={<Lecture/>}/>
          <Route path='/lecture/detail' element={<LectureDetail/>}/>
          <Route path='/community' element={<Community/>} />
          <Route path="/community/detail" element={<CommunityDetail/>}/>
          <Route path="/community/write" element={<CommunityWrite/>}/>
          <Route path="/studyroom" element={<StudyRoom/>}/>
          <Route path='*' element={<div>없는 페이지에요</div>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
export default App
