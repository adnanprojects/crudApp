import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import Alert from "../../components/Alert";

const Login = () => {
    // Use user context
    const { setUser } = useContext(UserContext);

    // Use navigation after login
    const navigate = useNavigate();

    // Error
    const [error, setError] = useState(null);

    // Credentials/Form Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginUser(email, password);
            setUser({ email, posts: [] });
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Login to your account</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email Address" className="input" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn">Login</button>
            </form>

            {error && <Alert msg={error} />}

        </section>
    );
};

export default Login;