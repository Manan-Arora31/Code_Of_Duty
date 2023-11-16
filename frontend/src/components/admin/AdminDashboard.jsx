// client/src/components/AdminDashboard.js
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
   //  Retriving the token from locatl Storage

   const token=localStorage.getItem('admintoken');
   console.log(token);
   if(!token)
   {
      navigate('/admin/login');
   }

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
    <Layout>
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
    </Layout>
  );
};

export default AdminDashboard;
