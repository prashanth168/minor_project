import React from 'react';
import Navibar from './Navibar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
// import HomeContent from './HomeContent';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navibar />

      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f9f9f9' }}>
        <Outlet />
      </div>
     

      <Footer />
    </div>
  );
}

export default Home;
