
import PostsModal from "../Modals/postModal"
import AllPosts from "../Posts/AllPosts"
import SplashFriends from "../Friends/splashFriends"
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
            <div className = 'linksContainer'>
                <div id = 'innerlinksContainer'>
                    <h1>Your shortcuts</h1>
                </div>
            </div>
            <section className="splashFront">
                <PostsModal type = {"Create"}/>
                <AllPosts/>
             </section>
            <div className = 'contactsContainer'>
                <div id = 'innercontactsContainer'>
                    <h1>Contacts</h1>
                    <SplashFriends/>
                </div>
            </div>
        </div>
        </>
    )
}

export default FrontSplash