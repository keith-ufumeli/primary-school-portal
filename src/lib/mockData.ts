// Core mock data structure
export const users = {
    admin: {
      name: "Mrs. Chiweshe",
      role: "admin",
      school: "Harare Primary School"
    },
    teacher: {
      name: "Mr. Ndlovu",
      role: "teacher",
      classes: ["4A", "4B"],
      subjects: ["Mathematics", "Science"]
    },
    parent: {
      name: "Mr. & Mrs. Mugabe",
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
      audience: "all"
    },
    // ... more announcements
  ];
  
  export const timetable = {
    "4A": [
      { time: "8:00-8:45", mon: "Mathematics", tue: "English", wed: "Shona", thu: "Science", fri: "Mathematics" },
      // ... more periods
    ]
  };