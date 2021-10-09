import db from '../models/db';

const users = `CREATE TABLE IF NOT EXISTS users(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(225) NOT NULL,
    email VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(225) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
);ENGINE=InnoDB DEFAULT CHARSET=latin1;`;

const accounts = `CREATE TABLE IF NOT EXISTS accounts(
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  accountNumber INT NOT NULL,
  created_at datetime NOT NULL,
  owner INT NOT NULL,
  balance NUMERIC(15, 2) NOT NULL
);ENGINE=InnoDB DEFAULT CHARSET=latin1;`;

const transactions = `CREATE TABLE IF NOT EXISTS transactions(
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created_at datetime NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  accountNumber INT NOT NULL,
  oldBalance NUMERIC(15, 2) NOT NULL,
  newBalance NUMERIC(15, 2) NOT NULL,
  beneficiaries VARCHAR NOT NULL,
);`;

db.query(users, (error) => {
    if (error) {
      return console.error('error creating users table');
    }
    console.log('users table created successfully');
  });

db.end();