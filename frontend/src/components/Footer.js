import React, { useState, useEffect } from "react";

function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="footer">
            <p className="footer__copyright">
                &copy; {currentYear} Mesto Russia
            </p>
        </footer>
    );
}

export default Footer;