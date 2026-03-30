import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import V5Editor from './V5/V5Editor.jsx';
import NotFoundPage from './NotFound.jsx';

// const router=createBrowserRouter([
const router=createHashRouter([
{
  path:"/",
  element:<V5Editor/>
},
{
  path:"/v5",
  element:<V5Editor/>
},
{
  path:"#google_vignette",
  element:<V5Editor/>
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
