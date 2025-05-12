import React, { useState } from 'react';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <style>
                {`

                    .nav-links a, .nav-links span {
                        text-decoration: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                    }

                    .nav-links a:hover, .nav-links span:hover {
                        color: #e94560;
                    }

                `}
            </style>

            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <a href="/">Home</a>
                    </li>

                    <li><a href="#movies">Movies</a></li>
                    <li><a href="#tv-series">TV Series</a></li>
                    <li><a href="#top-imdb">Top IMDb</a></li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
