import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await loginMutation({
                variables: { input: formData }
            });

            login(data.login.accessToken, data.login.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed!');
        }
    }

    return (
        <div className='auth-container'>
            <h2>Login</h2>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;