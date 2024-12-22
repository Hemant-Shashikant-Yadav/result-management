export interface Student {
  name: string;
  university_id: string;
  roll_no: string;
  class: string;
  division: string;
  mothers_name: string;
}

export interface Teacher {
  employee_id: string;
  name: string;
  email: string;
  password: string;
}

export interface Result {
  id: number;
  university_id: string;
  class: string;
  division: string;
  subject: string;
  marks: number;
}