import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import { getPosts } from "../controllers/postsController";
import Post from "../../components/Post";

const Home = () => {

    const { posts, setPosts } = useContext(PostContext);

    // loading 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const data = await getPosts();
            setPosts(data.posts)
            setLoading(false);
        }, 500);
    }, []);

    return (
        <section className="card">
            <h1 className="title">Latest Posts</h1>
            {loading && <i className="fa-solid fa-spinner text-3xl text-center block animate-spin"></i>}
            {posts && posts.map(post => <div key={post._id}>
                <Post post={post} ></Post>
            </div>
            )}
        </section>
    );
};

export default Home;