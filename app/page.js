'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>Electric Scooters for Everyone</h1>
          <p>Discover our amazing collection of electric scooters</p>
          <Link href="/products" className="btn">
            Shop Now
          </Link>
        </div>
      </motion.section>

      {/* Product Highlights */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <motion.h2 
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          <div className="products-grid">
            <motion.div 
              className="product-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Lightning Bolt</h3>
              <p>Our fastest scooter with amazing range</p>
              <div className="price">$599</div>
              <Link href="/products/1" className="btn">View Details</Link>
            </motion.div>
            <motion.div 
              className="product-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Urban Rider Pro</h3>
              <p>Perfect for city commuting</p>
              <div className="price">$799</div>
              <Link href="/products/2" className="btn">View Details</Link>
            </motion.div>
            <motion.div 
              className="product-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Eco Cruiser</h3>
              <p>Budget-friendly and eco-friendly</p>
              <div className="price">$399</div>
              <Link href="/products/3" className="btn">View Details</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}