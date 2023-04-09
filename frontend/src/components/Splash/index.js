
import PostsModal from "../Modals/postModal"
import AllPosts from "../Posts/AllPosts"
import './splash.css'
// import { fetchUsers } from "../../store/users"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

//import all users using fetchusers when loading multiple peoples
//comments on the splash page. 

const FrontSplash = ()=>{


    return(
        <>
        <div className="splashContainer">
        <section className="splashFront">
            <PostsModal type = {"Create"}/>
            <AllPosts/>
        </section>
        </div>
        </>
    )
}

export default FrontSplash