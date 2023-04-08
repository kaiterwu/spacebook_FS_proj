
import PostsModal from "../Modals/postModal"
import './splash.css'
// import { fetchUsers } from "../../store/users"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

//import all users using fetchusers when loading multiple peoples
//comments on the splash page. 

const FrontSplash = ()=>{


    return(
        <>
        <section className="splashFront">
            <PostsModal/>
        </section>
        </>
    )
}

export default FrontSplash