import { Route, Routes } from 'react-router-dom'
import NavComponent from './components/NavComponent'

export const HomePage = () => {
  return (
    <div className="bg-black text-white">
      <h1>tailwind css starter </h1>
    </div>
  )
}

export const AboutPage = () => {
  return (
    <div className="bg-black text-white">
      <h1>About</h1>
    </div>
  )
}
function App() {
  return (
    <div className="bg-black text-white min-h-screen ">
      <NavComponent />
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </>
    </div>
  )
}

export default App
