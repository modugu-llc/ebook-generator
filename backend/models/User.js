const database = require('./database');

class User {
  static create(userData) {
    return new Promise((resolve, reject) => {
      const { email, password_hash, first_name, last_name } = userData;
      const sql = `
        INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES (?, ?, ?, ?)
      `;
      
      database.getDB().run(sql, [email, password_hash, first_name, last_name], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...userData });
        }
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      
      database.getDB().get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE id = ?';
      
      database.getDB().get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static update(id, userData) {
    return new Promise((resolve, reject) => {
      const { first_name, last_name } = userData;
      const sql = `
        UPDATE users 
        SET first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      database.getDB().run(sql, [first_name, last_name, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }
}

module.exports = User;