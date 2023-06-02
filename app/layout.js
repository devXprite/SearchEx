import { headers } from 'next/headers'
import AuthContext from '@/context/AuthContext';
import Footer from '@/components/shared/Footer'
import './globals.scss'
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'SearchEx',
  description: 'Effortlessly explore the web',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'DevXprite', url: 'https://github.com/devxprite' }],
  colorScheme: 'dark',
  favicon: '/favicon.png',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    images: '/images/screenshot.png',
    type: 'website',
  },
};

async function getSession(cookies) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookies,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({ children }) {

  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <ThemeProvider>
      <html lang="en" >
       <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
       </head>
        <body>
          <main>
            <AuthContext session={session}>
              {children}
            </AuthContext>
          </main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  )
}
