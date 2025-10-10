import React from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
                <li><Link to="/about" style={styles.link}>About</Link></li>
                <li><Link to="/services" style={styles.link}>Services</Link></li>
                <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        background: '#a70000ff',
        padding: '1rem',
    },
    ul: {
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    }
};

export default Navigator;
