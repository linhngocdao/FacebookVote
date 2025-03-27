import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home/Home'
import FacebookLogin from './page/LoginFB'
import Facebook2FAScreen from './page/2fa/Confirm2FA'
import { PhoneNumberManager } from './page/PhoneNumber'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 30000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<FacebookLogin />} />
            <Route path='/2fa' element={<Facebook2FAScreen />} />
            <Route path="/phoneNumber" element={<PhoneNumberManager />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
