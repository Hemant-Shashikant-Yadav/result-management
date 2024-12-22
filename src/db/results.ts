import { exec, query } from './schema';

export async function findStudentResults(
  universityId: string,
  mothersName: string,
  className: string,
  division: string
) {
  return query(`
    SELECT s.*, r.subject, r.marks 
    FROM students s 
    LEFT JOIN results r ON s.university_id = r.university_id 
    WHERE s.university_id = $1 
    AND s.mothers_name = $2 
    AND s.class = $3 
    AND s.division = $4
  `, [universityId, mothersName, className, division]);
}

export async function addResults(
  universityId: string,
  className: string,
  division: string,
  subjects: { subject: string; marks: number }[]
) {
  // Add each subject result
  for (const { subject, marks } of subjects) {
    await exec(
      'INSERT INTO results (university_id, class, division, subject, marks) VALUES ($1, $2, $3, $4, $5)',
      [universityId, className, division, subject, marks]
    );
  }
}