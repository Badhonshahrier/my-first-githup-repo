'use client'
import { signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleCredentialLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      setError('Invalid credentials')
    }
  }

  return (
    <div>
      <Navbar />
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ marginBottom: '2rem' }}>Login</h1>
        
        <button 
          onClick={() => signIn('google')}
          className="btn"
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          Sign in with Google
        </button>
        
        <div style={{ margin: '1rem 0', textAlign: 'center' }}>
          <span>or</span>
        </div>
        
        <form onSubmit={handleCredentialLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          }
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
        
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Use any email and password to login with credentials
        </p>
      </motion.div>
    </div>
  )
}