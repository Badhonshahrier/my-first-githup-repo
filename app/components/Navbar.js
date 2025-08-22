'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="navbar-content">
          <Link href="/" className="logo">
            ScooterShop
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            {session ? (
              <>
                <li><Link href="/dashboard/add-product">Add Product</Link></li>
                <li>
                  <button 
                    onClick={() => signOut()}
                    className="btn btn-white"
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link href="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}