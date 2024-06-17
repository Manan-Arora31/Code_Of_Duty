
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
const authMiddlewareUser = async(req, res, next) => {
    const authhead= req.headers['authorization'];

    const [bearer,token]=authhead.split(' ');
   // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
       // console.log(decoded);
        
          // If the decoded token indicates an admin, fetch admin data
          const user = await User.findById(decoded._id);

    
          if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Admin not found' });
          }
           console.log(user);
          // console.log(user.firstname);
          req.user = user;
        next();
        }catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid token' });
        }
    
  };

  export default authMiddlewareUser;