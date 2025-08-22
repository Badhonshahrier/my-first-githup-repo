'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products')
      const products = await response.json()
      const foundProduct = products.find(p => p.id === params.id)
      setProduct(foundProduct)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Loading product...</h2>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Product not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <motion.div 
        className="product-details"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="product-image">
          [Product Image - {product.name}]
        </div>
        
        <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          {product.description}
        </p>
        
        <div className="price" style={{ marginBottom: '2rem' }}>
          ${product.price}
        </div>
        
        {product.specs && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Specifications:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Max Speed:</strong> {product.specs.maxSpeed}
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Range:</strong> {product.specs.range}
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Weight:</strong> {product.specs.weight}
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Charging Time:</strong> {product.specs.chargingTime}
              </li>
            </ul>
          </div>
        )}
        
        <motion.button 
          className="btn"
          style={{ fontSize: '1.2rem', padding: '15px 30px' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart (Not Working)
        </motion.button>
      </motion.div>
      <Footer />
    </div>
  )
}