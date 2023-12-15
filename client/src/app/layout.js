"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'familyShare',
  description: 'An app to share pictures with your family',

}

const queryClient = new QueryClient();

export default function RootLayout({ children }) {

  

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {/* <Navbar /> */}
            {children}  
          </QueryClientProvider>
        </AuthProvider>
        
      </body>
    </html>
  )
}
