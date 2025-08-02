const database = require('./database');

class Book {
  static create(bookData) {
    return new Promise((resolve, reject) => {
      const { user_id, title, category, prompt, content, status } = bookData;
      const sql = `
        INSERT INTO books (user_id, title, category, prompt, content, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      database.getDB().run(sql, [user_id, title, category, prompt, content || '', status || 'draft'], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...bookData });
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM books WHERE id = ?';
      
      database.getDB().get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC';
      
      database.getDB().all(sql, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, bookData) {
    return new Promise((resolve, reject) => {
      const { title, content, status, file_path, file_type } = bookData;
      const sql = `
        UPDATE books 
        SET title = ?, content = ?, status = ?, file_path = ?, file_type = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      database.getDB().run(sql, [title, content, status, file_path, file_type, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM books WHERE id = ?';
      
      database.getDB().run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM books ORDER BY created_at DESC';
      
      database.getDB().all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Book;