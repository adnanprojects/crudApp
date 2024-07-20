// Get all posts
const getPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();

    if (!res.ok)
        throw Error(data.error);

    return data;
};

// Get all user's posts
const userPosts = async () => {
    const res = await fetch('/api/posts/mypost', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await res.json();

    if (!res.ok)
        throw Error(data.error);

    return data;
}

// Create a post
const createPost = async (title, body) => {
    if (!title || !body)
        throw Error('All fields are mandatory');

    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, body })
    });

    const data = await res.json();

    if (!res.ok)
        throw Error(data.error);

    return data;
};


// Update a post
const updatePost = async (id, title, body) => {
    if (!title || !body)
        throw Error('All fields are mandatory');

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, body })
    });

    const data = await res.json();

    if (!res.ok)
        throw Error(data.error);

    return data;

};


// Delete a post
const deletePost = async (id) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await res.json();

    if (!res.ok)
        throw Error(data.error);

    return data;
};

export { getPosts, userPosts, createPost, updatePost, deletePost };