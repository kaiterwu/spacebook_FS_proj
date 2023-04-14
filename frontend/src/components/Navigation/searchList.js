import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { fetchUsers, getUsers,getUser } from "../../store/users"
import { useHistory } from "react-router-dom"
import { useRef } from "react"


const SearchList = ()=>{
    const allUsers = useSelector(getUsers)
    const loggedinUser = useSelector(state =>state.session.user);
    const sessionUser = useSelector(getUser(loggedinUser.id))
    const dispatch = useDispatch()
    const [query,setQuery] = useState("")
    const history = useHistory()
    const ref = useRef(null)
    const resultsRef = useRef(null)


    

    let nameList;

    if (query){
        nameList = "nameList"
    }else{
        nameList = "hidenameList"
    }

    function userAvatar(user){
        if (user.avatar){
            
          return  <div id = 'commentIcon'>
                <img alt = 'avatar'src = {user.avatar}/>
            </div>
        }else{
          return <div id = 'commentIcon'>
                <i className="fa-solid fa-user-circle" />
           </div>
        }
    }

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch,loggedinUser.id])

    const filteredUsers = allUsers.filter(user =>{
        // const fullName = `${user.firstName} ${user.lastName}`;
        const searchTerms = query.toLowerCase().split(' ')

        return searchTerms.every(term =>{
            return user.firstName.toLowerCase().includes(term) || 
            user.lastName.toLowerCase().includes(term)});
    })

    const handleClick = (userId)=>{
        history.push(`/users/${userId}`)
        setQuery('')
        ref.current.value = '';
    }

    const escapeKey = (e)=>{
        if (e.key === 'Escape'){
            setQuery('')
            ref.current.value = '';
        }
    }
    useEffect(()=>{
        const closeMenu = ()=>{
            setQuery('')
            ref.current.value = '';
        }
        document.addEventListener('click',closeMenu)
        return ()=>document.removeEventListener("click",closeMenu)
        },[dispatch]);

    useEffect(() => {
        const handleKeyPress = event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (resultsRef.current) {
                const firstResult = resultsRef.current.firstChild;
                if (firstResult) {
                const userId = firstResult.getAttribute('userId');
                handleClick(userId)
              }
            }
          }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
      },);

      function isFriend(sessionUser,userId){
        let showFriend;
        const friendArr = sessionUser.friends
        if (friendArr.includes(userId)){
            showFriend = <div id ='friendTag'>Friend</div>
        }else if(sessionUser.id === userId){
            showFriend = <div id = 'friendTag'>You</div>
        }
        
        return showFriend
      }
    return(
        <>
            <input id = 'searchInput' type = 'text' placeholder = "Search Spacebook" 
            ref = {ref} onChange={(e)=> setQuery(e.target.value)}
            onKeyDown={escapeKey}
            />
            <div>
                {
                    <ul ref = {resultsRef} id ={nameList} >
                        {filteredUsers.map(user =>(
                            
                            <li id = 'searchQuery' key = {user.id} userId = {user.id}
                            onClick={()=>handleClick(user?.id)}>
                                <div id = 'searchNamePic'>
                                    {userAvatar(user)} 
                                    {user.firstName} 
                                </div>
                                {user.lastName}
                                {isFriend(sessionUser,user.id)} 
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    )

}
export default SearchList 