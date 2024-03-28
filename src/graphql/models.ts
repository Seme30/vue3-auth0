export interface Student {
    firstName: string;
    lastName: string;
  }
  
 export interface Lesson {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    students: Student[];
  }
  