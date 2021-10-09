import mysql2 from 'mysql2'

const connection = mysql2.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'agbolahanxela',
  database : 'fintech_challenge',
  port: '3306'
});
connection.getConnection(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(`Error while connecting with database ${err}` );
}
});

export default connection;