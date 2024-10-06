import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import {AuthLayout} from './component'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <LoginPage/>
        </AuthLayout>
      }/>
      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <SignUpPage/>
        </AuthLayout>
      }/>
      <Route path='/all-posts' element={
        <AuthLayout authentication>
          <AllPosts/>
        </AuthLayout>
      }/>
      <Route path='/add-posts' element={
        <AuthLayout authentication>
          <AddPost/>
        </AuthLayout>
      }/>
      <Route path='/edit-posts/:slug' element={
        <AuthLayout authentication>
          <EditPost/>
        </AuthLayout>
      }/>
      <Route path='/post/:slug' element={<Post/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
