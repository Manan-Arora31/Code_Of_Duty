
import React from 'react';
import AdminNavbar from './AdminNavbar';

function Layout({ children }) {
  return (
    <div>
      <AdminNavbar />
      <div style={{ marginTop: '70px' }}>
        {}
        {children}
      </div>
    </div>
  );
}

export default Layout;