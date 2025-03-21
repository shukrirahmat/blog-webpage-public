import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import fetchURL from "../fetchURL";

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { postId } = useParams();
  const userLoggedIn = useOutletContext();
  const navigate = useNavigate();

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    setIsAddingComment(true);
    if (comment.length > 0) {
      const token = window.localStorage.getItem("token");
      

      if (!token) {
        navigate("/log-in");
        navigate(0);
      } else {
        fetch(fetchURL + "/posts/" + postId + "/comments", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({
            content: comment,
          }),
        }).then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Server error");
        }).then((data) => {
            navigate(0)
        }).catch((err) => {
            navigate("/log-in");
            navigate(0);
        })

      }
    }
    setIsAddingComment(false);
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
          {post.comments.map((comment) => {
            return (
              <li key={comment.id}>
                <h5>
                  {comment.writerUsername} on {comment.dateWritten}
                </h5>
                <p>{comment.content}</p>
              </li>
            );
          })}
          {!userLoggedIn && (
            <li>
              <p>
                PLEASE <Link to={`/log-in`}>LOG IN</Link> TO COMMENT
              </p>
            </li>
          )}
          {userLoggedIn && (
            <li>
              <form onSubmit={submitComment}>
                <textarea
                  name="comment"
                  placeholder="Enter comment..."
                  onChange={handleComment}
                  value={comment}
                ></textarea>
                {!isAddingComment && <button>COMMENT</button>}
                {isAddingComment && <button disabled>ADDING COMMENT...</button>}
              </form>
            </li>
          )}
        </ul>
      </>
    );
  }
}

export default Post;
