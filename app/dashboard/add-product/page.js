'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'

export default function AddProduct() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    maxSpeed: '',
    range: '',
    weight: '',
    chargingTime: ''
  })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        specs: {
          maxSpeed: formData.maxSpeed,
          range: formData.range,
          weight: formData.weight,
          chargingTime: formData.chargingTime
        }
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        setMessage('Product added successfully!')
        setFormData({
          name: '',
          description: '',
          price: '',
          maxSpeed: '',
          range: '',
          weight: '',
          chargingTime: ''
        })
      } else {
        setMessage('Failed to add product')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <Navbar />
      <motion.div 
        className="form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Add New Electric Scooter
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Max Speed</label>
            <input
              type="text"
              name="maxSpeed"
              value={formData.maxSpeed}
              onChange={handleChange}
              placeholder="e.g., 25 mph"
            />
          </div>
          
          <div className="form-group">
            <label>Range</label>
            <input
              type="text"
              name="range"
              value={formData.range}
              onChange={handleChange}
              placeholder="e.g., 30 miles"
            />
          </div>
          
          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 35 lbs"
            />
          </div>
          
          <div className="form-group">
            <label>Charging Time</label>
            <input
              type="text"
              name="chargingTime"
              value={formData.chargingTime}
              onChange={handleChange}
              placeholder="e.g., 4 hours"
            />
          </div>
          
          <motion.button 
            type="submit" 
            className="btn" 
            style={{ width: '100%' }}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </motion.button>
        </form>
        
        {message && (
          <div className={message.includes('successfully') ? 'success' : 'error'}>
            {message}
          </div>
        )}
      </motion.div>
    </div>
  )
}