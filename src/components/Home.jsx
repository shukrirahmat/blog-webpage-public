import { useEffect, useState } from "react";
import fetchURL from "../fetchURL";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import {format} from "date-fns";

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
          throw new Error("Unable to load posts. Server Error");
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
    return <p className={styles.message}>Loading Posts...</p>;
  } else if (error) {
    return <p className={styles.message}>{error}</p>;
  } else {
    return (
      <div className={styles.home}>
        <div className={styles.leftbox}>
        <ul className={styles.postsContainer}>
          {posts.map((post) => {
            if (post.published) {
              return (
                <Link to={`/posts/${post.id}`}>
                <li key={post.id} className={styles.post}>
                  <div className={styles.postTitle}>
                      <h3>{post.title}</h3>
                    <p>
                      by <b>{post.authorUsername}</b> on {format(post.datePosted, 'Pp')}
                    </p>
                  </div>
                  <hr></hr>
                  <p className={styles.content}>{post.content}</p>
                </li>
                </Link>
              );
            }
          })}
        </ul>
        </div>
        <div className={styles.rightbox}>
        {posts.map((post) => {
            if (post.published) {
              return (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  {post.title}
                </Link>
              );
            }
          })}
          
        </div>
      </div>
    );
  }
};

export default Home;
