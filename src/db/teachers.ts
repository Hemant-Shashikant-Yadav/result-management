import { query, exec } from './schema';
import { Teacher } from '../types';

export async function addTeacher(teacher: Teacher): Promise<void> {
  await exec(
    'INSERT INTO teachers (employee_id, name, email, password) VALUES (?, ?, ?, ?)',
    [teacher.employee_id, teacher.name, teacher.email, teacher.password]
  );
}

export async function addTeacherBulk(teachers: Teacher[]): Promise<void> {
  for (const teacher of teachers) {
    await addTeacher(teacher);
  }
}