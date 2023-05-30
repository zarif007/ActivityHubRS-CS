// temporary code
const allActivities = [
    {
        "Name": "Dance",
        "Class time": "10am -11:30am",
        "Venue": "OB-407",
        "Day": "Friday",
        "Instructor": "Ms. Manoshee",
        "DS": "Ms. Laizu"
    },
    {
        "Name": "Glass Painting",
        "Class time": "10am-11:30am",
        "Venue": "OB 406",
        "Day": "Friday",
        "Instructor": "Ms. Anika",
        "DS": "Ms. Asha"
    },
    {
        "Name": "Guiter playing- Beginner level",
        "Class time": "10am-11:30am",
        "Venue": "OB-301",
        "Day": "Friday",
        "Instructor": "Mr. Turjo",
        "DS": "Mr.Taslim"
    },
    {
        "Name": "Graphics Design- Beginner level",
        "Class time": "10am-11:30pm",
        "Venue": "OB-302",
        "Day": "Friday",
        "Instructor": "Ms. Tushi",
        "DS": "Mr. Taslim"
    },
    {
        "Name": "Drawing and Skecting Beginner level",
        "Class time": "10am-11:30am",
        "Venue": "OB-303",
        "Day": "Friday",
        "Instructor": "Mr. Mohaimin",
        "DS": "Mr. Sezan"
    },
    {
        "Name": "Drawing and Skecting Advance level",
        "Class time": "10am-11:30am",
        "Venue": "OB-304",
        "Day": "Friday",
        "Instructor": "Mr. Nehal",
        "DS": "Mr. Sezan"
    },
    {
        "Name": "Painting\/ Folk art",
        "Class time": "10am-11:30am",
        "Venue": "OB-305",
        "Day": "Friday",
        "Instructor": "Mr. Ferdos",
        "DS": "Ms. Erina"
    },
    {
        "Name": "Youth Leadership",
        "Class time": "10am -11:30am",
        "Venue": "OB-203",
        "Day": "Friday",
        "Instructor": "Mr. Rafsan",
        "DS": "Ms. Erina"
    },
    {
        "Name": "Basics of Robotics",
        "Class time": "10am-12pm",
        "Venue": "OB-204",
        "Day": "Friday",
        "Instructor": "Mr. Adil",
        "DS": "Ms. Laizu"
    },
    {
        "Name": "App Development",
        "Class time": "10am-11:30am",
        "Venue": "Lab-1",
        "Day": "Friday",
        "Instructor": "Mr. Zuhair",
        "DS": "Ms. Tasnia"
    },
    {
        "Name": "Animated Film Making - Beginner Level",
        "Class time": "10am-11:30am",
        "Venue": "Lab-2",
        "Day": "Friday",
        "Instructor": "Mr. Rafi",
        "DS": "Ms. Tasnia"
    },
    {
        "Name": "Martial art (Female)",
        "Class time": "10am-11:30am",
        "Venue": "Annondopur",
        "Day": "Friday",
        "Instructor": "Ms. Anika",
        "DS": "Ms. Tanima"
    },
    {
        "Name": "Presentation Skills Section-2",
        "Class time": "10am-11:30am",
        "Venue": "OB-101",
        "Day": "Friday",
        "Instructor": "Ms. Promi",
        "DS": "Mr.Bikash"
    },
    {
        "Name": "Presentation Skills Section-1",
        "Class time": "10am-11:30am",
        "Venue": "OB-102",
        "Day": "Friday",
        "Instructor": "Ms. Promi",
        "DS": "Mr.Mosharrof"
    },
    {
        "Name": "German Language",
        "Class time": "10am-12pm",
        "Venue": "OB-103",
        "Day": "Friday",
        "Instructor": "Mr. Ashraf",
        "DS": "Mr. Jashim"
    },
    {
        "Name": "France Language",
        "Class time": "10am-12pm",
        "Venue": "OB-104",
        "Day": "Friday",
        "Instructor": "Mr. Salam",
        "DS": "Mr. Bakul"
    },
    {
        "Name": "Japanese Language Section-1",
        "Class time": "10am-12pm",
        "Venue": "OB-105",
        "Day": "Friday",
        "Instructor": "Mr. Tamim",
        "DS": "Mr. Harun"
    },
    {
        "Name": "Zumba",
        "Class time": "10am-11:30am",
        "Venue": "OB Basement Canteen",
        "Day": "Friday",
        "Instructor": "Ms. Sanji",
        "DS": "Ms. Laizu"
    },
    {
        "Name": "Taekwondo( Male)",
        "Class time": "10am-11:30am",
        "Venue": "Annondopur",
        "Day": "Friday",
        "Instructor": "Mr. Sankar",
        "DS": "Ms. Tanima"
    },
    {
        "Name": "Yoga & Meditation Female",
        "Class time": "9:30am-10:30am",
        "Venue": "Markuli hall",
        "Day": "Friday",
        "Instructor": "Ms. Humaira",
        "DS": "Ms. Asha"
    },
    {
        "Name": "Yoga & Meditation Male",
        "Class time": "10:45am-11:45am",
        "Venue": "Markuli hall",
        "Day": "Friday",
        "Instructor": "Mr. Ashis",
        "DS": "Mr. Harun"
    },
    {
        "Name": "Amra Notun Network Morning",
        "Class time": "9am - 12pm",
        "Venue": "OB 405",
        "Day": "Friday",
        "Instructor": "Ms. Ditee",
        "DS": "Mr. Mosharrof"
    },
    {
        "Name": "Amra Notun Network Evening",
        "Class time": "3pm - 6pm",
        "Venue": "OB 101",
        "Day": "Friday",
        "Instructor": "Ms. Ditee",
        "DS": "Mr. Bikash"
    },
    {
        "Name": "Guiter Advanced level",
        "Class time": "10am-11:30am",
        "Venue": "OB-301",
        "Day": "Saturday",
        "Instructor": "Mr. Ahanaf",
        "DS": "Mr. Sazzad"
    },
    {
        "Name": "Graphics Advanced level",
        "Class time": "10am-11:30am",
        "Venue": "OB-302",
        "Day": "Saturday",
        "Instructor": "Mr. Naim",
        "DS": "Mr. Sazzad"
    },
    {
        "Name": "Photography",
        "Class time": "10am-11:30am",
        "Venue": "OB-304",
        "Day": "Saturday",
        "Instructor": "Mr. Prottoy",
        "DS": "Mr. Rayhan"
    },
    {
        "Name": "TV News Presentation",
        "Class time": "10am-11:30am",
        "Venue": "OB-305",
        "Day": "Saturday",
        "Instructor": "Ms. Rehana",
        "DS": "Ms. Fahmida"
    },
    {
        "Name": "E- Game development",
        "Class time": "10am-11:30am",
        "Venue": "OB-203",
        "Day": "Saturday",
        "Instructor": "Mr. shishir",
        "DS": "Mr. Rayhan"
    },
    {
        "Name": "Mushroom Cultivation",
        "Class time": "10am-11:30am",
        "Venue": "OB-204",
        "Day": "Saturday",
        "Instructor": "Mr. Ekram",
        "DS": "Mr. Belal"
    },
    {
        "Name": "Web development Beginner Level section-2",
        "Class time": "9am -10am",
        "Venue": "Lab-1",
        "Day": "Saturday",
        "Instructor": "Mr. Danial",
        "DS": "Mr. Labib"
    },
    {
        "Name": "Web development Beginner Level section-1",
        "Class time": "10am-11am",
        "Venue": "Lab-2",
        "Day": "Saturday",
        "Instructor": "Mr. Danial",
        "DS": "Mr. Labib"
    },
    {
        "Name": "Web development advanced Level",
        "Class time": "11:30am-12:30pm",
        "Venue": "Lab-1",
        "Day": "Saturday",
        "Instructor": "Mr.Zariful",
        "DS": "Mr. Labib"
    },
    {
        "Name": "Animation Film Advanced Level",
        "Class time": "11:30am-12:30pm",
        "Venue": "Lab-2",
        "Day": "Saturday",
        "Instructor": "Mr. Sadik",
        "DS": "Mr. Belal"
    },
    {
        "Name": "Spanish Language",
        "Class time": "10am-12pm",
        "Venue": "OB-101",
        "Day": "Saturday",
        "Instructor": "Mr. Kazi",
        "DS": "Mr. Bakul"
    },
    {
        "Name": "Block & Batik Design",
        "Class time": "10am-11:30am",
        "Venue": "OB-102",
        "Day": "Saturday",
        "Instructor": "Ms. Nusrat",
        "DS": "Ms. Mohima"
    },
    {
        "Name": "Japaness Language Section -2",
        "Class time": "10am-12pm",
        "Venue": "OB-103",
        "Day": "Saturday",
        "Instructor": "Mr. Tamim",
        "DS": "Ms. Takia"
    },
    {
        "Name": "Stage Drama",
        "Class time": "10am-12pm",
        "Venue": "OB-104",
        "Day": "Saturday",
        "Instructor": "Mr. Debashis",
        "DS": "Mr. Jashim"
    },
    {
        "Name": "Jewellery Making",
        "Class time": "10am-11:30am",
        "Venue": "OB-105",
        "Day": "Saturday",
        "Instructor": "Ms. Noshin",
        "DS": "Ms. Fahmida"
    },
    {
        "Name": "Amra Notun Network Morning",
        "Class time": "9am - 12pm",
        "Venue": "OB 405",
        "Day": "Saturday",
        "Instructor": "Ms. Ditee",
        "DS": "Ms. Takia"
    },
    {
        "Name": "Amra Notun Network Evening",
        "Class time": "3pm - 6pm",
        "Venue": "OB 101",
        "Day": "Saturday",
        "Instructor": "Ms. Ditee",
        "DS": "Ms. Mohima"
    }
]

export const stringifiedList = `
    1. Dance 
    2. Glass Painting 
    3. Guiter playing- Beginner level 
    4. Drawing and Skecting Beginner level 
    5. Drawing and Skecting Advance level 
    6. Painting/ Folk art 
    7. Youth Leadership 
    8. Basics of Robotics 
    9. App Development 
    10. Animated Film Making - Beginner Level 
    11. Martial art
    12. Presentation Skills
    13. E- Game development 
    14. German Language 
    15. France Language 
    16. Japanese Language
    17. Zumba 
    18. Taekwondo
    19. Yoga & Meditation 
    20. Animated Film Making Advance
    21. Amra Notun Network Morning 
    22. Amra Notun Network Evening 
    23. Graphics Design- Beginner level
    24. Graphics Design- Advance level
    25. Web Development Beginner
    26. Web Development Advance
    27. Jewellery Making
    28. Guiter Advanced level
    29. Block & Batik Design
    30. TV News Presentation
    31. Stage Drama
    31. Spanish Language
    32. German Language
    33. Chinese Language
    34. Korean Language
    35. Painting
    `

export default allActivities;