import React from 'react';
import Footer from './Footer';


const Layout = ({ children }) => {
    return (
        <>
            <div>
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
};
export default Layout;