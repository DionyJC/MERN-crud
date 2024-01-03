import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'react-hot-toast'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Form from './components/addUser/Form.jsx'
import Edit from './components/updateUser/Edit.jsx'

const router =createBrowserRouter([
  {
    path: '/',
    element:<Layout />,
    errorElement:<ErrorPage />,
    children: [
     {index: true, element: <App />},
     {path: '/add', element: <Form /> },
     {path: '/edit/:id', element: <Edit /> },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
