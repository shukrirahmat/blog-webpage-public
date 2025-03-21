import { useEffect} from "react";
import { useParams , useOutletContext} from "react-router-dom";

function Post() {
    
    const {postId} = useParams();
    const userLoggedIn = useOutletContext();


    return (
        <div>
            <p>POST {postId}</p>
            {userLoggedIn && <p>YOU ARE LOGGED IN</p>}
        </div>
    )
}

export default Post;