import { useContext, useState } from "react";
import { updatePost } from "../controllers/postsController";
import Alert from '../../components/Alert';
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {

    const { posts, setPosts } = useContext(PostContext);

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { state } = useLocation();

    const [title, setTitle] = useState(state.title);
    const [body, setBody] = useState(state.body);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const data = await updatePost(state._id, title, body);
            setPosts([...posts, data.post]);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Update your post</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder="Post Title" value={title} onChange={e => setTitle(e.target.value)} className="input" autoFocus />
                <textarea rows='6' className="input" value={body} onChange={e => setBody(e.target.value)} placeholder="Post Content" />
                <button className="btn">Update Post</button>
            </form>

            {error && <Alert msg={error} />}
        </section>
    );
};

export default Update;