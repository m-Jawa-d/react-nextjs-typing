// app/page.js
"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Typing Test</h1>
      <Link href="/typing-test" style={styles.link}>
        Start Typing Test
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  link: {
    color: '#61dafb',
    fontSize: '24px',
    textDecoration: 'none',
    marginTop: '20px',
  },
};
