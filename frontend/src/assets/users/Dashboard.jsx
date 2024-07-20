import { useContext, useState, useEffect } from "react";
import { deletePost, userPosts } from "../controllers/postsController";
import { UserContext } from '../../contexts/UserContext';
import Post from "../../components/Post";
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import Success from '../../components/Success';

const Dashboard = () => {

    const { user, setUser } = useContext(UserContext);

    // loading 
    const [loading, setLoading] = useState(true);
    // Error
    const [error, setError] = useState(null);
    // Success
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            const { posts, email } = await userPosts();
            setUser({ email, posts });
            setLoading(false);
        }, 500);
    }, []);

    const handleDelete = async (id) => {
        try {
            const data = await deletePost(id);
            setSuccess(data.message);
        } catch (error) {
            setError(error.message);
        }
        const newPosts = user.posts.filter(post => post._id !== id);
        setUser({ ...user, posts: newPosts });
    };

    return (
        <section className="card" >
            <p className="first-letter:uppercase">{user.email.split('@')[0]}</p>
            <h1 className="title">User Dashboard</h1>
            {loading && <i className="fa-solid fa-spinner text-3xl text-center block animate-spin"></i>}
            {success && <Success msg={success} />}
            {error && <Alert msg={error} />}
            {
                user.posts && user.posts.map(post => <div key={post._id}>
                    <Post post={post}>
                        <div className="flex items-center gap-2">
                            <Link className='fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200' state={post} to='/update' title="Update"></Link>
                            <button className="fa-solid fa-trash-can text-red-500 hover:bg-red-200" title="Delete" onClick={() => handleDelete(post._id)}></button>
                        </div>
                    </Post>
                </div>)
            }
        </section >
    );
};

export default Dashboard;