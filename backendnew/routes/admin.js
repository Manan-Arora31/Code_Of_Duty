import express from 'express';
const router=express.Router();
import Admin from '../models/admin.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import authMiddleware from '../middleware/authMiddleware.js';


router.post('/register',async(req,res)=>{
    
    const {secretkey,username,email,password}=req.body;
   
      try {
            const existingAdmin = await Admin.findOne({ email });

            if (existingAdmin) {
            return res.status(400).json({ message: 'Admin username already exists' });
            }
        
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newAdmin = new Admin({ username,email, password: hashedPassword });
        
            await newAdmin.save();
        
            res.json({ message: 'Admin registration successful' });
        
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

      }
    }
);

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const admin = await Admin.findOne({ email });
    
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        // Generate JWT token
        const token = jwt.sign(
          { userId: admin._id, username: admin.username, email:admin.email},
          'ManPraMad',
          { expiresIn: '1h' }
        );
    
        res.json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  
});
router.get('/dashboard',authMiddleware,async(req,res)=>{
    console.log("here at router");
    res.json({adminData:req.user});
  
});
export default router
