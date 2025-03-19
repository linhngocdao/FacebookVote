import { Footer, Header } from "../../component"
import VotingSection from "../../component/VoteItem"
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <>
      <Header />
      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md text-center mb-4">
          {message}
        </div>
      )}
      <VotingSection />
      <Footer />
    </>
  )
}

export default Home
