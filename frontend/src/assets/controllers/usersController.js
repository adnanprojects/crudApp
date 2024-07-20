// login
const loginUser = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields are required!');
    };

    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok)
        throw Error(data.error);

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
};

// register
const registerUser = async ({ name, email, password }) => {
    if (!email || !password || !name) {
        throw Error('All fields are required!');
    };

    const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (!res.ok)
        throw Error(data.error);

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
};

export { loginUser, registerUser };