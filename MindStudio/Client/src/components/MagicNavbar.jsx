import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MagicNavbar.css';
import { IonIcon } from '@ionic/react';
import { home, person, addCircle, settings, chatbubble, albums, call, informationCircle, logIn } from 'ionicons/icons';
import logo from '../assets/TherapyLogo01.png'; // Adjust the path to your logo

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const markerRef = useRef(null);
    const listRef = useRef([]);

    useEffect(() => {
        const marker = markerRef.current;
        const activeItem = listRef.current[activeIndex];
        if (marker && activeItem) {
            marker.style.left = `${activeItem.offsetLeft}px`;
            marker.style.width = `${activeItem.offsetWidth}px`;
        }
    }, [activeIndex]);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="navigation">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul>
                {[
                    { icon: home, text: 'Home', link: '/' },
                    { icon: person, text: 'Profile', link: '/profile' },
                    { icon: chatbubble, text: 'Messages', link: '/messages' },
                    { icon: albums, text: 'Photos', link: '/photos' },
                    { icon: settings, text: 'Settings', link: '/settings' },
                    { icon: albums, text: 'Specializations', link: '/specializations' },
                    { icon: call, text: 'Contact Us', link: '/contact-us' },
                    { icon: informationCircle, text: 'About Us', link: '/about-us' },
                    { icon: logIn, text: 'Login', link: '/login' }
                ].map((item, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? 'active' : ''}
                        onMouseEnter={() => handleItemClick(index)}
                        ref={(el) => (listRef.current[index] = el)}
                    >
                        <Link to={item.link}>
                            <IonIcon icon={item.icon} />
                            <span className="nav-text">{item.text}</span> {/* Changed <text> to <span> with a class */}
                        </Link>
                    </li>
                ))}
                <div id="marker" ref={markerRef}><span></span></div>
            </ul>
        </div>
    );
};

export default Navbar;
