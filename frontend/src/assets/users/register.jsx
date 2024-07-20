import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../controllers/usersController";
import { UserContext } from '../../contexts/UserContext';
import Alert from "../../components/Alert";

const Register = () => {

    // use user context
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setUser({ email: formData.email, posts: [] });
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return <section className="card">
        <h1 className="title">Create a new account</h1>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" className="input" autoFocus value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" placeholder="Email Address" className="input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" placeholder="Password" className="input" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <button className="btn">Register</button>
        </form>

        {error && <Alert msg={error} />}

    </section>;
};

export default Register;