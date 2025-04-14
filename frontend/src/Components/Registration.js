import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleFormSubmit = (userObj) => {
    alert('Form submitted successfully!');
    navigate('/signin');
  };

  return (
    <div className='container mt-5'>
      <div className='card shadow-lg p-4' style={{ maxWidth: '600px', margin: 'auto', borderRadius: '20px' }}>
        <h3 className='text-center mb-4 text-primary'>Registration Form</h3>

        {/* User Type */}
        <div className='mb-3'>
          <label className='form-label'>Register As</label>
          <select className='form-select' onChange={handleUserTypeChange} value={userType} required>
            <option value=''>Select Role</option>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>

          {/* Common Fields */}
          <div className='mb-3'>
            <label className='form-label' htmlFor='username'>Username</label>
            <input type='text' className='form-control' id='username' placeholder='Enter username' {...register('username', { required: true })} />
          </div>

          <div className='mb-3'>
            <label className='form-label' htmlFor='email'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Enter email' {...register('email', { required: true })} />
          </div>

          <div className='mb-3'>
            <label className='form-label' htmlFor='password'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter password' {...register('password', { required: true })} />
          </div>

          {/* Patient Fields */}
          {userType === 'patient' && (
            <>
              <div className='mb-3'>
                <label className='form-label'>Gender</label><br />
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='radio' id='male' value='male' {...register('gender', { required: true })} />
                  <label className='form-check-label' htmlFor='male'>Male</label>
                </div>
                <div className='form-check form-check-inline'>
                  <input className='form-check-input' type='radio' id='female' value='female' {...register('gender', { required: true })} />
                  <label className='form-check-label' htmlFor='female'>Female</label>
                </div>
              </div>

              <div className='mb-3'>
                <label className='form-label'>City</label>
                <select className='form-select' {...register('city', { required: true })}>
                  <option value=''>Select City</option>
                  <option value='Hyderabad'>Hyderabad</option>
                  <option value='Karimnagar'>Karimnagar</option>
                  <option value='Nizambad'>Nizambad</option>
                  <option value='Warangal'>Warangal</option>
                  <option value='Nalgonda'>Nalgonda</option>
                </select>
              </div>
            </>
          )}

          {/* Doctor Fields */}
          {userType === 'doctor' && (
            <>
              <div className='mb-3'>
                <label className='form-label'>Specialization</label>
                <input type='text' className='form-control' placeholder='Enter specialization' {...register('specialization', { required: true })} />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Experience (in years)</label>
                <input type='number' className='form-control' placeholder='Enter experience' {...register('experience', { required: true })} />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Hospital Name</label>
                <input type='text' className='form-control' placeholder='Enter hospital name' {...register('hospitalName', { required: true })} />
              </div>
            </>
          )}

          {/* Admin Fields */}
          {userType === 'admin' && (
            <>
              <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input type='password' className='form-control' placeholder='Confirm password' {...register('confirmPassword', { required: true })} />
              </div>
            </>
          )}

          <button type='submit' className='btn btn-primary w-100 mt-3'>Register</button>
          <p className='text-center mt-3'>Already have an account? <a href='/signin'>Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
