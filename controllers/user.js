import db from '../models/db';
import userAuth from './authController';


class User {

  static async signUp(request, response) {
    const {
      name, email, password,
    } = request.body;

    email = email.toLowerCase();

    const hashedPassword = userAuth.hashPassword(password);
    const text = `INSERT INTO users(name, email, password)
      VALUES(?, ?, ?) ;`;
    const values = [name, email, hashedPassword];

    try {
      const { rows } = await db.query(text, values);
      const token = userAuth.generateToken(rows[0].id);

      return response.status(201).json({
        status: 201,
        data: [{
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return response.status(400).json({
          status: 400,
          error: 'User with that email already exists',
        });
      }
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  
  static async signIn(request, response) {
    const { password } = request.body;
    const text = 'SELECT id, name, email FROM users WHERE email = ?;';
    const passwordText = 'SELECT password FROM users WHERE email = ?; [email]';

    let { email } = request.body;
    email = email.toLowerCase();

    try {
      const { rows } = await db.query(text, [email]);
      const hashedPasswordRow = await db.query(passwordText, [email]);
      const token = userAuth.generateToken(rows[0]);

      if (!rows[0]) {
        return response.status(404).json({
          status: 404,
          error: 'User with that email does not exist',
        });
      }

      if (!userAuth.comparePassword(password, hashedPasswordRow.rows[0].password)) {
        return response.status(401).json({
          status: 401,
          error: 'Incorrect password',
        });
      }
      return response.status(200).json({
        status: 200,
        data: [{
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        }],
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  } 
}

export default User;
