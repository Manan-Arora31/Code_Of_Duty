// client/src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
   
  useEffect(() => {
   //  Retriving the token from locatl Storage

   const token=localStorage.getItem('token');
   console.log(token);

    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/dashboard',{
            headers: {
               Authorization:`Bearer ${token}`,
            },
      });
        setAdminData(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      {adminData && (
        <div>
          <p>Admin ID: {adminData.adminData._id}</p>
          <p>Username: {adminData.adminData.username}</p>
          {/* Add additional admin data as needed */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;