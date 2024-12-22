import initSqlJs from 'sql.js';
import { Database } from 'sql.js';

let db: Database | null = null;

export async function initDatabase() {
  if (db) return db;
  
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  
  db = new SQL.Database();
  
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      university_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      roll_no TEXT NOT NULL,
      class TEXT NOT NULL,
      division TEXT NOT NULL,
      mothers_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS teachers (
      employee_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      university_id TEXT NOT NULL,
      class TEXT NOT NULL,
      division TEXT NOT NULL,
      subject TEXT NOT NULL,
      marks INTEGER NOT NULL,
      FOREIGN KEY (university_id) REFERENCES students(university_id)
    );

    CREATE TABLE IF NOT EXISTS admin (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL
    );
  `);

  // Insert default admin if not exists
  db.run(`
    INSERT OR IGNORE INTO admin (username, password)
    VALUES ('admin', 'admin123')
  `);

  return db;
}

export async function query(sql: string, params: any[] = []): Promise<any[]> {
  const database = await initDatabase();
  const stmt = database.prepare(sql);
  return stmt.getAsObject(params);
}

export async function exec(sql: string, params: any[] = []): Promise<void> {
  const database = await initDatabase();
  database.run(sql, params);
}

// Helper functions for common operations
export async function findAdmin(username: string, password: string) {
  return query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);
}

export async function findTeacher(employeeId: string, password: string) {
  return query('SELECT * FROM teachers WHERE employee_id = ? AND password = ?', [employeeId, password]);
}

export async function findStudentResults(universityId: string, mothersName: string, className: string, division: string) {
  return query(`
    SELECT s.*, r.subject, r.marks 
    FROM students s 
    LEFT JOIN results r ON s.university_id = r.university_id 
    WHERE s.university_id = ? 
    AND s.mothers_name = ? 
    AND s.class = ? 
    AND s.division = ?
  `, [universityId, mothersName, className, division]);
}