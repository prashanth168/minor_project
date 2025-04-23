import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Components/userSlice'; // adjust path if needed
import toast, { Toaster } from 'react-hot-toast';

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
      toast.error('Please select a role before logging in.');
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
        toast.success(`Login successful as ${userRole}!`);

        dispatch(setUser({
          _id: data._id,
          email: data.email,
          role: data.role,
          username: data.username,
          age: data.age,
          gender: data.gender,
          city: data.city,
          specialization: data.specialization,
          experience: data.experience,
          token: data.token
        }));

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); 
      } else {
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='container mt-5'>
      <Toaster position="top-center" reverseOrder={false} />
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
