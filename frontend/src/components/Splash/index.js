
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
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };

    return(
        <>
        <div className="splashContainer">
            <div className = 'linksContainer'>
                <div id = 'innerlinksContainer'>
                    <h1>Your shortcuts</h1>
                    <div id ='shortcutsContainer'>
                        <p onClick={() => openInNewTab('https://github.com/kaiterwu/spacebook_FS_proj.git')}
                        > <i className="fa-brands fa-github"></i> GitHub</p>
                        <p onClick={()=> openInNewTab('https://www.linkedin.com/in/kaiter-wu-7ba70a62')}
                        > <i className="fa-brands fa-linkedin"></i> Linkedin</p>
                        <p onClick={()=> openInNewTab('https://wellfound.com/u/kaiter-wu')}
                        > <i className="fa-brands fa-angellist"></i> Wellfound</p>
                        <p onClick={()=> openInNewTab('https://kaiterwu.github.io/Cycle_js_proj/')}
                        > <i className="fa-solid fa-cloud-sun-rain"></i> Weather</p>
                    </div>
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