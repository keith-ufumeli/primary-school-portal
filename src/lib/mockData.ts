// Types
export interface Student {
  id: string;
  name: string;
  grade: string;
  photo: string;
  attendance: Record<string, string>;
  subjects: Array<{
    name: string;
    grade: number;
    teacher: string;
  }>;
  fees: Array<{
    term: number;
    due: string;
    amount: number;
    status: string;
  }>;
  behavior: Array<{
    date: string;
    type: string;
    note: string;
  }>;
}

// Core mock data structure
export const users = {
    admin: {
      id: "admin-01",
      name: "Mrs. Chiweshe",
      username: "admin@school.com",
      role: "admin",
      school: "Lorem Primary School"
    },
    teacher: {
      id: "teacher-01",
      name: "Mr. Ndlovu",
      username: "teacher-01",
      role: "teacher",
      classes: ["4A", "4B"],
      subjects: ["Mathematics", "Science"]
    },
    parent: {
      id: "parent-01",
      name: "Mr. & Mrs. Mugabe",
      username: "parent-01",
      role: "parent",
      children: [
        { id: "std-01", name: "Tendai Mugabe", grade: "4A" },
        { id: "std-02", name: "Ngonidzashe Mugabe", grade: "2B" }
      ]
    }
  };
  
  export const students = [
    {
      id: "std-01",
      name: "Tendai Mugabe",
      grade: "4A",
      photo: "/avatars/student-01.jpg",
      attendance: {
        "2023-10-01": "present",
        "2023-10-02": "absent",
        "2023-10-03": "present",
        "2023-10-04": "present",
        "2023-10-05": "present",
        "2023-10-06": "present",
        "2023-10-07": "present",
        "2023-10-08": "absent",
        "2023-10-09": "present",
        "2023-10-10": "present",
      },
      subjects: [
        { name: "English", grade: 82, teacher: "Mr. Ndlovu" },
        { name: "Mathematics", grade: 75, teacher: "Mr. Ndlovu" },
        { name: "Science", grade: 88, teacher: "Mr. Ndlovu" },
        { name: "Heritage Studies", grade: 90, teacher: "Mr. Ndlovu" },
        { name: "Physical Education", grade: 95, teacher: "Mr. Ndlovu" },
        { name: "Art", grade: 78, teacher: "Mr. Ndlovu" },
        { name: "Music", grade: 85, teacher: "Mr. Ndlovu" },
        { name: "Shona", grade: 92, teacher: "Mr. Ndlovu" },
        { name: "ICT", grade: 88, teacher: "Mr. Ndlovu" }
      ],
      fees: [
        { term: 1, due: "2023-02-15", amount: 50, status: "paid" },
        { term: 2, due: "2023-06-10", amount: 50, status: "due" },
        { term: 3, due: "2023-09-05", amount: 50, status: "pending" }
      ],
      behavior: [
        { date: "2023-10-01", type: "positive", note: "Helped clean classroom" },
        { date: "2023-10-03", type: "negative", note: "Late to class" }
      ]
    },
    {
      id: "std-02",
      name: "Ngonidzashe Mugabe",
      grade: "2B",
      photo: "/avatars/student-02.jpg",
      attendance: {
        "2023-10-01": "present",
        "2023-10-02": "present",
        "2023-10-03": "present",
        "2023-10-04": "present",
        "2023-10-05": "present",
        "2023-10-06": "present",
        "2023-10-07": "present",
        "2023-10-08": "present",
        "2023-10-09": "present",
        "2023-10-10": "present",
      },
      subjects: [
        { name: "English", grade: 78, teacher: "Mrs. Chideme" },
        { name: "Mathematics", grade: 85, teacher: "Mrs. Chideme" },
        { name: "Science", grade: 82, teacher: "Mrs. Chideme" },
        { name: "Heritage Studies", grade: 88, teacher: "Mrs. Chideme" },
        { name: "Physical Education", grade: 90, teacher: "Mrs. Chideme" },
        { name: "Art", grade: 92, teacher: "Mrs. Chideme" },
        { name: "Music", grade: 87, teacher: "Mrs. Chideme" },
        { name: "Shona", grade: 95, teacher: "Mrs. Chideme" },
        { name: "ICT", grade: 89, teacher: "Mrs. Chideme" }
      ],
      fees: [
        { term: 1, due: "2023-02-15", amount: 50, status: "paid" },
        { term: 2, due: "2023-06-10", amount: 50, status: "paid" },
        { term: 3, due: "2023-09-05", amount: 50, status: "pending" }
      ],
      behavior: [
        { date: "2023-10-01", type: "positive", note: "Excellent class participation" },
        { date: "2023-10-05", type: "positive", note: "Helped younger students" }
      ]
    },
    {
      id: "std-03",
      name: "Tatenda Moyo",
      grade: "5A",
      photo: "/avatars/student-03.jpg",
      attendance: {
        "2023-10-01": "present",
        "2023-10-02": "present",
        "2023-10-03": "present",
        "2023-10-04": "absent",
        "2023-10-05": "present",
        "2023-10-06": "present",
        "2023-10-07": "present",
        "2023-10-08": "present",
        "2023-10-09": "present",
        "2023-10-10": "present",
      },
      subjects: [
        { name: "English", grade: 85, teacher: "Mrs. Smith" },
        { name: "Mathematics", grade: 92, teacher: "Mrs. Smith" },
        { name: "Science", grade: 88, teacher: "Mrs. Smith" },
        { name: "Heritage Studies", grade: 90, teacher: "Mrs. Smith" },
        { name: "Physical Education", grade: 87, teacher: "Mrs. Smith" },
        { name: "Art", grade: 83, teacher: "Mrs. Smith" },
        { name: "Music", grade: 89, teacher: "Mrs. Smith" },
        { name: "Shona", grade: 91, teacher: "Mrs. Smith" },
        { name: "ICT", grade: 86, teacher: "Mrs. Smith" }
      ],
      fees: [
        { term: 1, due: "2023-02-15", amount: 50, status: "paid" },
        { term: 2, due: "2023-06-10", amount: 50, status: "paid" },
        { term: 3, due: "2023-09-05", amount: 50, status: "overdue" }
      ],
      behavior: [
        { date: "2023-10-02", type: "positive", note: "Outstanding homework completion" },
        { date: "2023-10-04", type: "negative", note: "Disrupted class during lesson" }
      ]
    },
    {
      id: "std-04",
      name: "Rumbidzai Chiweshe",
      grade: "3B",
      photo: "/avatars/student-04.jpg",
      attendance: {
        "2023-10-01": "present",
        "2023-10-02": "present",
        "2023-10-03": "present",
        "2023-10-04": "present",
        "2023-10-05": "present",
        "2023-10-06": "present",
        "2023-10-07": "present",
        "2023-10-08": "present",
        "2023-10-09": "present",
        "2023-10-10": "present",
      },
      subjects: [
        { name: "English", grade: 90, teacher: "Mr. Dube" },
        { name: "Mathematics", grade: 87, teacher: "Mr. Dube" },
        { name: "Science", grade: 85, teacher: "Mr. Dube" },
        { name: "Heritage Studies", grade: 92, teacher: "Mr. Dube" },
        { name: "Physical Education", grade: 88, teacher: "Mr. Dube" },
        { name: "Art", grade: 94, teacher: "Mr. Dube" },
        { name: "Music", grade: 91, teacher: "Mr. Dube" },
        { name: "Shona", grade: 89, teacher: "Mr. Dube" },
        { name: "ICT", grade: 90, teacher: "Mr. Dube" }
      ],
      fees: [
        { term: 1, due: "2023-02-15", amount: 50, status: "paid" },
        { term: 2, due: "2023-06-10", amount: 50, status: "paid" },
        { term: 3, due: "2023-09-05", amount: 50, status: "paid" }
      ],
      behavior: [
        { date: "2023-10-01", type: "positive", note: "Perfect attendance this week" },
        { date: "2023-10-06", type: "positive", note: "Excellent leadership in group activities" }
      ]
    },
    {
      id: "std-05",
      name: "Takudzwa Ndlovu",
      grade: "6A",
      photo: "/avatars/student-05.jpg",
      attendance: {
        "2023-10-01": "present",
        "2023-10-02": "present",
        "2023-10-03": "present",
        "2023-10-04": "present",
        "2023-10-05": "present",
        "2023-10-06": "present",
        "2023-10-07": "present",
        "2023-10-08": "present",
        "2023-10-09": "present",
        "2023-10-10": "present",
      },
      subjects: [
        { name: "English", grade: 88, teacher: "Mrs. Moyo" },
        { name: "Mathematics", grade: 95, teacher: "Mrs. Moyo" },
        { name: "Science", grade: 91, teacher: "Mrs. Moyo" },
        { name: "Heritage Studies", grade: 87, teacher: "Mrs. Moyo" },
        { name: "Physical Education", grade: 93, teacher: "Mrs. Moyo" },
        { name: "Art", grade: 85, teacher: "Mrs. Moyo" },
        { name: "Music", grade: 89, teacher: "Mrs. Moyo" },
        { name: "Shona", grade: 92, teacher: "Mrs. Moyo" },
        { name: "ICT", grade: 91, teacher: "Mrs. Moyo" }
      ],
      fees: [
        { term: 1, due: "2023-02-15", amount: 50, status: "paid" },
        { term: 2, due: "2023-06-10", amount: 50, status: "paid" },
        { term: 3, due: "2023-09-05", amount: 50, status: "due" }
      ],
      behavior: [
        { date: "2023-10-03", type: "positive", note: "Outstanding performance in mathematics" },
        { date: "2023-10-08", type: "positive", note: "Helped organize school library" }
      ]
    }
  ];
  
  export const announcements = [
    {
      id: 1,
      title: "Sports Day Postponed",
      content: "Due to weather conditions, sports day has been moved to next Friday.",
      date: "2023-10-05",
      audience: "all",
      attachment: null
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      content: "Monthly parent-teacher meeting scheduled for next week. Please check your email for details.",
      date: "2023-10-03",
      audience: "parent",
      attachment: "meeting_schedule.pdf"
    },
    {
      id: 3,
      title: "School Calendar Update",
      content: "Updated school calendar for the academic year 2023-2024.",
      date: "2023-10-01",
      audience: "all",
      attachment: "school_calendar_2023.pdf"
    }
  ];
  
  export const timetable = {
    "4A": [
      { time: "8:00-8:45", mon: "Mathematics", tue: "English", wed: "Shona", thu: "Science", fri: "Mathematics" },
      { time: "8:45-9:30", mon: "English", tue: "Mathematics", wed: "Science", thu: "Shona", fri: "English" },
      { time: "9:30-10:15", mon: "Science", tue: "Shona", wed: "Mathematics", thu: "English", fri: "Science" },
      { time: "10:30-11:15", mon: "Shona", tue: "Science", wed: "English", thu: "Mathematics", fri: "Shona" },
      { time: "11:15-12:00", mon: "Physical Education", tue: "Art", wed: "Music", thu: "Social Studies", fri: "Physical Education" }
    ]
  };


// NEW: Get user data function
export function getUserData(username: string) {
  return Object.values(users).find(user => user.username === username) || users.parent;
}

// NEW: Get student by ID
export function getStudentById(id: string) {
  return students.find(student => student.id === id);
}

// NEW: Get announcements for role
export function getAnnouncements(role: string) {
  return announcements.filter(ann => 
    ann.audience === "all" || ann.audience === role
  );
}