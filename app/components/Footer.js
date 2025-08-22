'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <p>&copy; 2024 ScooterShop. All rights reserved.</p>
        <p>Contact us: info@scootershop.com | (555) 123-4567</p>
      </div>
    </motion.footer>
  )
}