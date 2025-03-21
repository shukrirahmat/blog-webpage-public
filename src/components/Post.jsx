import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import fetchURL from "../fetchURL";

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { postId } = useParams();
  const userLoggedIn = useOutletContext();
  const navigate = useNavigate();

  const handleComment = (e) => {
    setCommentText(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    setError(null);
    if (commentText.length > 0) {
      const token = window.localStorage.getItem("token");

      if (!token) {
        navigate("/log-in");
        navigate(0);
      } else {
        setIsAddingComment(true);
        fetch(fetchURL + "/posts/" + postId + "/comments", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({
            content: commentText,
          }),
        })
          .then((response) => {
            if (response.ok) return response.json();
            else if (response.status === 401) throw new Error("Unverified");
            else throw new Error("Unable to add comment. Server Error");
          })
          .then((data) => {
            let newComments = comments.slice();
            newComments.push(data);
            setComments(newComments);
            setIsAddingComment(false);
            setCommentText("");
          })
          .catch((err) => {
            if (err.message === "Unverified") {
              navigate("/log-in");
              navigate(0);
            } else {
              setCommentError(err.message);
              setCommentText("");
            }
            setIsAddingComment(false);
            
          });
        
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(fetchURL + "/posts/" + postId, {
      mode: "cors",
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading Posts...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <>
        <div>
          <h3>{post.title}</h3>
          <h5>
            by {post.authorUsername} on {post.datePosted}
          </h5>
          <p>{post.content}</p>
        </div>

        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <h5>
                  {comment.writerUsername} on {comment.dateWritten}
                </h5>
                <p>{comment.content}</p>
              </li>
            );
          })}
          {userLoggedIn === false && (
            <li>
              <p>
                PLEASE <Link to={`/log-in`}>LOG IN</Link> TO COMMENT
              </p>
            </li>
          )}
          {userLoggedIn === true && (
            <li>
              <form onSubmit={submitComment}>
                <textarea
                  name="comment"
                  placeholder="Enter comment..."
                  onChange={handleComment}
                  value={commentText}
                ></textarea>
                {!isAddingComment && <button>COMMENT</button>}
                {isAddingComment && <button disabled>ADDING COMMENT...</button>}
              </form>
            </li>
          )}
          {commentError && <p>{commentError}</p>}
        </ul>
      </>
    );
  }
};

export default Post;
