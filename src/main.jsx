import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import V4ProfileForm from './V4/V4ProfileForm.jsx';
import NotFoundPage from './NotFound.jsx';

// const router=createBrowserRouter([
const router=createHashRouter([
{
  path:"/",
  element:<V4ProfileForm/>
},
{
  path:"#google_vignette",
  element:<V4ProfileForm/>
},
{
    path: '*', // This wildcard path must be the LAST route defined
    element: <NotFoundPage/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
   </StrictMode>,
  
)
