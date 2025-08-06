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
      school: "Harare Primary School"
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
        // ... more dates
      },
      subjects: [
        { name: "Mathematics", grade: 82, teacher: "Mr. Ndlovu" },
        { name: "English", grade: 75, teacher: "Mrs. Smith" },
        { name: "Shona", grade: 90, teacher: "Ms. Chideme" },
        { name: "Science", grade: 88, teacher: "Mr. Ndlovu" }
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
    // ... more students
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
      // ... more periods
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