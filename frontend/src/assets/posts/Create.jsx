import { useContext, useState } from "react";
import { createPost } from "../controllers/postsController";
import Alert from '../../components/Alert';
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const { posts, setPosts } = useContext(PostContext);

    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const data = await createPost(title, body);
            setPosts([...posts, data.post]);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Create a new post</h1>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Post Title" value={title} onChange={e => setTitle(e.target.value)} className="input" autoFocus />
                <textarea rows='6' className="input" value={body} onChange={e => setBody(e.target.value)} placeholder="Post Content" />
                <button className="btn">Create Post</button>
            </form>

            {error && <Alert msg={error} />}
        </section>
    );
};

export default Create;