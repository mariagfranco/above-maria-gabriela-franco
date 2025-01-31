
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import SavedEpisodes from './pages/SavedEpisodes'
import Layout from './Layout'
import { SeriesProvider } from './context/SeriesContext'

function App() {

  return (
    <SeriesProvider>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/episodes" element={<SavedEpisodes />} />
      </Route>
  
    </Routes>

    </BrowserRouter>

    </SeriesProvider>
  )
}

export default App
