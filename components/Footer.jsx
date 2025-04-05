import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} Built with ❤️ by{' '}
        <a href="http://portfolio-alpha-vert-96.vercel.app/about" target="_blank" rel="noopener noreferrer">
          Tahir Khan
        </a>
      </p>
      <div style={styles.socials}>
        <a href="https://github.com/tahirkhan7" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/tahirkhan7" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaLinkedin />
        </a>
        <a href="https://twitter.com/taahir_khann" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '50px',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
    fontSize: '14px',
    color: '#666',
  },
  socials: {
    marginTop: '10px',
  },
  icon: {
    margin: '0 10px',
    color: '#555',
    fontSize: '20px',
    textDecoration: 'none',
  },
};

export default Footer;
