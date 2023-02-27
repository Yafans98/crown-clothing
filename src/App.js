import { Routes, Route } from 'react-router-dom';
import SingIn from './routes/sign-in/sing-in.component';
import Home from './routes/Home/home.component'
import Navigation from './routes/navigation/navigation.component';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SingIn />} />
      </Route>
    </Routes >
  )
}

export default App;


