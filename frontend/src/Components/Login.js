import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Components/userSlice'; // adjust path if needed

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState('');

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const onLoginSubmit = async (userObj) => {
    if (!userRole) {
      alert('Please select a role before logging in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/userapi/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userObj, role: userRole }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Login successful as ${userRole}!`);
        dispatch(setUser({ username: data.username, role: userRole, token: data.token }));
        navigate('/dashboard');
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='card shadow-lg p-4' style={{ maxWidth: '500px', margin: 'auto', borderRadius: '20px' }}>
        <h3 className='text-center mb-4 text-primary'>Login</h3>

        <div className='mb-3'>
          <label className='form-label'>Login As</label>
          <select className='form-select' onChange={handleRoleChange} value={userRole} required>
            <option value=''>Select Role</option>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              className='form-control'
              placeholder='Enter username'
              {...register('username', { required: true })}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='form-control'
              placeholder='Enter password'
              {...register('password', { required: true })}
            />
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-3'>Login</button>
          <p className='text-center mt-3'>
            Don't have an account? <a href='/signup'>Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
