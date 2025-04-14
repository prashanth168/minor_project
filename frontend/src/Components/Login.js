import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  const onLoginSubmit = (userObj) => {
    if (!userRole) {
      alert('Please select a role before logging in.');
      return;
    }

    // Simulate login success
    alert(`Login successful as ${userRole}!`);
    console.log('User login details:', { ...userObj, role: userRole });

    // Navigate to a role-specific dashboard if desired
    // For now, just navigating to a common /dashboard
    navigate('/dashboard');
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div className='container mt-5'>
      <div className='card shadow-lg p-4' style={{ maxWidth: '500px', margin: 'auto', borderRadius: '20px' }}>
        <h3 className='text-center mb-4 text-primary'>Login</h3>

        {/* Role Selection */}
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
