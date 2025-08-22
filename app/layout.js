import './globals.css'
import AuthSessionProvider from './components/SessionProvider'

export const metadata = {
  title: 'ScooterShop - Electric Scooters',
  description: 'Best electric scooters for your daily commute',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}