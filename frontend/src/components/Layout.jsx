import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({ email: null, posts: [] });
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <header className="bg-blue-600 text-white">
                <nav className="flex items-center justify-between p-4">
                    <Link title="Home" to='/' className="fa-solid fa-house nav-link" />
                    {user.email ?
                        (<div className="flex items-center gap-4">
                            <Link title="Create" to='/create' className="fa-solid fa-circle-plus nav-link" />
                            <Link title="Dashboard" to='/dashboard' className="fa-solid fa-circle-user nav-link" />
                            <button title="Logout" onClick={handleLogout} className="fa-solid fa-right-from-bracket nav-link"></button>
                        </div>) :
                        (<div className="flex items-center gap-4">
                            <Link title="Login" to='/login' className="fa-solid fa-right-to-bracket nav-link" />
                            <Link title="Register" to='/register' className="fa-solid fa-user-plus nav-link" />
                        </div>)}
                </nav>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;