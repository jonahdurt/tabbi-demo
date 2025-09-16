import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import TunerPage from './pages/TunerPage'
import UserTabsPage from './pages/UserTabsPage'
import TabViewPage from './pages/TabViewPage'
import NotFoundPage from './pages/NotFoundPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from "./pages/ProfilePage"
import TabCreationPage from './pages/TabCreationPage'
import Tutorial from "./pages/Tutorial";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
        <Route path='/tuner' element={<TunerPage />} />
        <Route path='/mytabs' element={<UserTabsPage />} />
        <Route path='/tab/:id' element={<TabViewPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tutorial' element={<Tutorial />} />
        <Route path='/user/profile' element={<ProfilePage />} />
        <Route path='/user/:id/profile' element={<ProfilePage />} />
        <Route path='/new-tab' element={<TabCreationPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </>
  )
)

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
