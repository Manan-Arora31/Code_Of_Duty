import Admin from '../models/admin.js';

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authhead= req.headers['authorization'];

    const [bearer,token]=authhead.split(' ');
    console.log(token);


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'ManPraMad');

    
      // If the decoded token indicates an admin, fetch admin data
      const admin = await Admin.findById(decoded.userId);

      if (!admin) {
        return res.status(401).json({ message: 'Unauthorized - Admin not found' });
      }

      req.user = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;