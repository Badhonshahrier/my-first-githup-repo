import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

// Mock data - intentionally hardcoded for simplicity
const mockProducts = [
  {
    id: '1',
    name: 'Lightning Bolt Electric Scooter',
    description: 'Fast and reliable electric scooter for daily commuting',
    price: 599,
    image: '/scooter1.jpg',
    specs: {
      maxSpeed: '25 mph',
      range: '30 miles',
      weight: '35 lbs',
      chargingTime: '4 hours'
    }
  },
  {
    id: '2',
    name: 'Urban Rider Pro',
    description: 'Perfect for city rides with great battery life',
    price: 799,
    image: '/scooter2.jpg',
    specs: {
      maxSpeed: '28 mph',
      range: '40 miles',
      weight: '38 lbs',
      chargingTime: '5 hours'
    }
  },
  {
    id: '3',
    name: 'Eco Cruiser',
    description: 'Environmentally friendly and budget-friendly option',
    price: 399,
    image: '/scooter3.jpg',
    specs: {
      maxSpeed: '20 mph',
      range: '25 miles',
      weight: '32 lbs',
      chargingTime: '3 hours'
    }
  }
]

export async function GET() {
  try {
    // Try to connect to MongoDB but fall back to mock data
    const client = await clientPromise
    const db = client.db('scooter-shop')
    const products = await db.collection('products').find({}).toArray()
    
    if (products.length === 0) {
      return NextResponse.json(mockProducts)
    }
    
    return NextResponse.json(products)
  } catch (error) {
    // Intentionally return mock data if DB fails
    console.log('DB connection failed, using mock data')
    return NextResponse.json(mockProducts)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Basic validation (intentionally simple)
    if (!body.name || !body.price) {
      return NextResponse.json({ error: 'Name and price required' }, { status: 400 })
    }
    
    const client = await clientPromise
    const db = client.db('scooter-shop')
    
    const newProduct = {
      ...body,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date()
    }
    
    await db.collection('products').insertOne(newProduct)
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}