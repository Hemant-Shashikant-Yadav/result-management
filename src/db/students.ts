import { query, exec } from './schema';
import { Student } from '../types';

export async function addStudent(student: Student): Promise<void> {
  await exec(
    'INSERT INTO students (name, university_id, roll_no, class, division, mothers_name) VALUES (?, ?, ?, ?, ?, ?)',
    [student.name, student.university_id, student.roll_no, student.class, student.division, student.mothers_name]
  );
}

export async function addStudentBulk(students: Student[]): Promise<void> {
  for (const student of students) {
    await addStudent(student);
  }
}