import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import HomeContent from './Components/HomeContent';
import Features from './Components/Features';
import About from './Components/About';
import Contact from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Symptom from './SymptomChecker/Symptom';
function App() {
  let Router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
      children:[
        {path:'/',
          element:<HomeContent/>
        },
        {
          path:'signin',
          element:<Login/>
        },
        {
          path:'signup',
          element:<Registration/>
        },
        {
          path:'/features',
          element:<Features/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/contact',
          element:<Contact/>
        },
        {
          path:'/dashboard',
          element:<Dashboard/>,

        }
        

      ]
    },
    {
      path:'/symptom-checker',
      element:<Symptom/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;


// import { useSelector } from 'react-redux';

// const { username, role, token } = useSelector((state) => state.user);
