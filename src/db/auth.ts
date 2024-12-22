import { query } from './schema';

export async function findTeacher(employeeId: string, password: string) {
  console.log('Searching for teacher:', { employeeId, password });
  const results = await query(
    'SELECT * FROM teachers WHERE employee_id = $1 AND password = $2',
    [employeeId, password]
  );
  console.log('Query results:', results);
  return results[0] || null;
}