import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ResultDB extends DBSchema {
  students: {
    key: string;
    value: {
      university_id: string;
      name: string;
      roll_no: string;
      class: string;
      division: string;
      mothers_name: string;
    };
  };
  teachers: {
    key: string;
    value: {
      employee_id: string;
      name: string;
      email: string;
      password: string;
    };
  };
  results: {
    key: number;
    value: {
      id: number;
      university_id: string;
      class: string;
      division: string;
      subject: string;
      marks: number;
    };
    indexes: { 'by-university-id': string };
  };
}

let db: IDBPDatabase<ResultDB> | null = null;

export async function initDatabase() {
  if (db) return db;
  
  db = await openDB<ResultDB>('results-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('students')) {
        db.createObjectStore('students', { keyPath: 'university_id' });
      }
      
      if (!db.objectStoreNames.contains('teachers')) {
        db.createObjectStore('teachers', { keyPath: 'employee_id' });
      }
      
      if (!db.objectStoreNames.contains('results')) {
        const store = db.createObjectStore('results', { 
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('by-university-id', 'university_id');
      }
    }
  });

  return db;
}

export async function query(sql: string, params: any[] = []): Promise<any[]> {
  const database = await initDatabase();
  
  // Parse the SQL to determine the operation
  const normalized = sql.toLowerCase().trim();
  
  if (normalized.includes('select * from teachers')) {
    const [employeeId, password] = params;
    const tx = database.transaction('teachers', 'readonly');
    const teacher = await tx.store.get(employeeId);
    return teacher && teacher.password === password ? [teacher] : [];
  }
  
  if (normalized.includes('select s.*, r.subject, r.marks')) {
    const [universityId, mothersName, className, division] = params;
    const tx = database.transaction(['students', 'results'], 'readonly');
    const student = await tx.objectStore('students').get(universityId);
    
    if (!student || 
        student.mothers_name !== mothersName || 
        student.class !== className || 
        student.division !== division) {
      return [];
    }
    
    const results = await tx.objectStore('results').index('by-university-id').getAll(universityId);
    return results.map(result => ({
      ...student,
      subject: result.subject,
      marks: result.marks
    }));
  }
  
  return [];
}

export async function exec(sql: string, params: any[] = []): Promise<void> {
  const database = await initDatabase();
  const normalized = sql.toLowerCase().trim();
  
  if (normalized.includes('insert into teachers')) {
    const [employeeId, name, email, password] = params;
    const tx = database.transaction('teachers', 'readwrite');
    await tx.store.put({
      employee_id: employeeId,
      name,
      email,
      password
    });
  }
  
  if (normalized.includes('insert into students')) {
    const [name, universityId, rollNo, className, division, mothersName] = params;
    const tx = database.transaction('students', 'readwrite');
    await tx.store.put({
      name,
      university_id: universityId,
      roll_no: rollNo,
      class: className,
      division,
      mothers_name: mothersName
    });
  }
  
  if (normalized.includes('insert into results')) {
    const [universityId, className, division, subject, marks] = params;
    const tx = database.transaction('results', 'readwrite');
    await tx.store.add({
      university_id: universityId,
      class: className,
      division,
      subject,
      marks
    });
  }
}