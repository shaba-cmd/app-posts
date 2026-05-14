import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import useComments from './modules/api'
import Auth from './pages/Auth/Auth'
import Main from './pages/Main/Main'
import Posts from './pages/Posts/Posts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const { comments, loader, name } = useComments();
  
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Main />}/>
          
          <Route path='/posts' element={<Posts 
            comments={comments}
            loader={loader}
            name={name}
          />}/>
          
          <Route path='/auth' element={<Auth />}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
