import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Events from './components/Events.jsx'
import Aarti from './components/Aarti.jsx'
import Gallery from './components/Gallery.jsx'
import Social from './components/Social.jsx'
import Login from './components/Login.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="aarti" element={<Aarti />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="social" element={<Social />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}