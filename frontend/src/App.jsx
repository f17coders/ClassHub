// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommunityWrite from './pages/Community/CommunityWrite'
import CommunityModify from './pages/Community/CommunityModify'
import StudyRoom from './pages/StudyRoom/StudyRoom'
import StudyRoomRecruit from './pages/StudyRoom/StudyRoomRecruit'
import StudyRoomParticipating from './pages/StudyRoom/StudyRoomParticipating'
import StudyRoomPrivateMessage from './pages/StudyRoom/StudyRoomPrivateMessage'
import Lecture from './pages/Lecture/Lecture'
import LectureDetail from './pages/Lecture/LectureDetail'
import MyPage from './pages/MyPage/MyPage'
import MyPageLecture from './pages/MyPage/MyPageLecture'
import MyPageLike from './pages/MyPage/MyPageLike'
import MyPageCommunity from './pages/MyPage/MyPageCommunity'
import MyPageEdit from './pages/MyPage/MyPageEdit'
import AdditionalInfo from './pages/AdditionalInfo'
import Login from './pages/Login'
import {createTheme, ThemeProvider} from '@mui/material'


const theme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <div style={{minHeight: ''}}>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/lecture' element={<Lecture/>}/>
          <Route path='/lecture/detail/:lectureId' element={<LectureDetail/>}/>
          <Route path='/community' element={<Community/>} />
          <Route path="/community/detail/:communityId" element={<CommunityDetail/>}/>
          <Route path="/community/write" element={<CommunityWrite/>}/>
          <Route path="/community/modify/:communityId" element={<CommunityModify/>}/>
          <Route path="/studyroom" element={<StudyRoom/>}>
            {/* /studyroom/recruit가 기본으로 열리도록 설정 */}
            <Route index element={<StudyRoomRecruit />} />
            <Route path="recruit" element={<StudyRoomRecruit />} />
            <Route path="participating/:studyId" element={<StudyRoomParticipating/>} />
            <Route path="message/:personalChatId" element={<StudyRoomPrivateMessage />} />
          </Route>
          <Route path='/mypage' element={<MyPage/>}>
            <Route index element={<MyPageLecture/>} />
            <Route path='lecture' element={<MyPageLecture/>} />
            <Route path='like' element={<MyPageLike/>} />
            <Route path='community' element={<MyPageCommunity/>} />
            <Route path='edit' element={<MyPageEdit/>} />
          </Route>
          <Route path='/additionalinfo' element={<AdditionalInfo/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<div>없는 페이지에요</div>}/>
        </Routes>
      </div>
      <Footer/>
    </ThemeProvider>
  )
}
export default App
