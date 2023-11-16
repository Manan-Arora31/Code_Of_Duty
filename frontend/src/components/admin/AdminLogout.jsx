import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Perform logout logic (clear tokens, etc.)
      // For example, clear localStorage
      localStorage.removeItem('admintoken');

      // Redirect to the login page
      navigate('/admin/login');
    };

    // Immediately invoke the logout logic when the component mounts
    handleLogout();
  }, [navigate]);

   return <p>Logging out...</p>;

  
}

export default AdminLogout;
