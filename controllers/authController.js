import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class ValidateUser {
  
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

 
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  
  static generateToken(user) {
    const token = jwt.sign({ user },
      process.env.SECRET, { expiresIn: '30d' });
    return token;
  }
}

export default ValidateUser;