import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import BlogState from './context/BlogState'
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AllBlogs from "./components/AllBlogs";
import MyBlogs from "./components/MyBlogs";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import UpdateBlog from './components/UpdateBlog'
import Account from "./components/Account";


function App() {

  return (
    <>
    <BlogState>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/account/:id" element={<Account />} />

        
      </Routes>
    </BrowserRouter>
      </BlogState>
    </>
  )
}

export default App
