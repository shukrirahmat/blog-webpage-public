import { useEffect, useState } from "react";
import fetchURL from "../fetchURL";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(fetchURL + "/posts", {
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
        setPosts(data);
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
      <div>
        <h1>POSTS</h1>
        <ul>
          {posts.map((post) => {
            if (post.published) {
              return (
                <li key={post.id}>
                  <div>
                    <Link to={`/posts/${post.id}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <h5>
                      by {post.authorUsername} on {post.datePosted}
                    </h5>
                    <p>{post.content}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
};

export default Home;
