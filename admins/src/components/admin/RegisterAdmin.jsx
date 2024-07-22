import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {registerAdmin} from '../../features/auth/AuthSlice'

function RegisterAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const {isLoading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    dispatch(registerAdmin({username, email, password}))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
        <input 
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input 
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button disabled={isLoading}>{isLoading ? 'Loading....' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default RegisterAdmin
