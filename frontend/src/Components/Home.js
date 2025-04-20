import React from 'react';
import Navibar from './Navibar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navibar />

      <div style={{ flexGrow: 1 }}>
        <div style={{ minHeight: '80vh', padding: '2rem', backgroundColor: '#f9f9f9' }}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
