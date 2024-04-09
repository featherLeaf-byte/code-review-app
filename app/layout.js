import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Powered Code Review App',
  description: 'Application that use OpenAI to generate a code review',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <div>
            <img className="nav-img" src="./qudu-logo.svg" alt="" />
          </div>
          <div className="nav-title">AI Powered Code Review App</div>
        </nav>
        {children}
      </body>
    </html>
  )
}
