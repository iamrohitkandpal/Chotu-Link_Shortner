import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await registerMutation({
                variables: { input: formData }
            });

            login(data.register.accessToken, data.register.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed!');
        }
    }

    return (
        <div className='auth-container'>
            <h2>Register</h2>
            {error && <p className='error'>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder='Name (optional)' value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder='Password (min 6 characters)' value={formData.password} onChange={handleChange} minLength={6} required />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;