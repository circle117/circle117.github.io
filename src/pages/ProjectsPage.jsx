import TimelineItem from "../components/TimelineItem";

export default function ProjectsPage() {
  var Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = Months[today.getMonth()]; //January is 0!
  var yyyy = today.getFullYear();

  today = mm + " " + dd + ", " + yyyy;

  const timelineData = [
    {
      type: "point",
      text: "Today",
      date: today,
    },
    {
      type: "project",
      text: "Food Delivery Platform Backend Development",
      date: "May 2024",
      skills: "Java, Spring Boot, MySQL, Redis, RESTful API",
      category: {
        tag: "Web Development",
        color: "#FF9A00",
      },
      link: {
        url: "https://github.com/circle117/food-delivery-platform",
        text: "GitHub repository",
      },
    },
    {
      type: "project",
      text: "Booking Platform Full-Stack Development",
      date: "April 2024",
      skills: "MERN stack, RESTful API",
      category: {
        tag: "Web Development",
        color: "#FF9A00",
      },
      link: {
        url: "https://github.com/circle117/booking-platform",
        text: "GitHub repository",
      },
    },
    {
      type: "project",
      text: "Automated Testing Suites Development",
      date: "March 2024",
      skills: "Java, Mavan, JUnitSelenium, REST Assured, Gatling",
      category: {
        tag: "Software Testing",
        color: "#B3E2A7",
      },
      link: {
        url: "http://nil.csail.mit.edu/6.824/2022/labs/lab-shard.html",
        text: "See instructions here",
      },
    },
    {
      type: "project",
      text: "Sharded Key/Value Service Development",
      date: "March 2024",
      skills: "Go, Raft, RPC",
      category: {
        tag: "Distributed Systems",
        color: "#FFBF00",
      },
      link: {
        url: "http://nil.csail.mit.edu/6.824/2022/labs/lab-shard.html",
        text: "See instructions here",
      },
    },
    {
      type: "project",
      text: "MapReduce Framework Development",
      date: "Feburary 2024",
      skills: "Go, MapReduce, RPC",
      category: {
        tag: "Distributed Systems",
        color: "#FFBF00",
      },
      link: {
        url: "https://pdos.csail.mit.edu/6.824/labs/lab-mr.html",
        text: "See instructions here",
      },
    },
    {
      type: "point",
      text: "Enrolled in University of British Columbia",
      date: "September 2023",
    },
    {
      type: "project",
      text: "Web-based Course System Full-stack Development",
      date: "November 2022",
      skills: "Java, Spring, MySQL, Vue.js, Element UI",
      category: {
        tag: "Web Development",
        color: "#FF9A00",
      },
      link: {
        url: "https://github.com/circle117/course-management-system-backend",
        text: "GitHub repository",
      },
    },
    {
      type: "point",
      text: "Graduated from Shanghai University",
      date: "July 2022",
    },
    {
      type: "project",
      text: "Polyimides Representation and Properties Prediction",
      date: "January - June 2022",
      skills: "Python, TensorFlow, GCN, TabNet",
      category: {
        tag: "Data Mining",
        color: "#808836",
      },
      link: {
        url: "https://github.com/circle117/MaterialsGCN",
        text: "GitHub repository",
      },
    },
    {
      type: "project",
      text: "Data Analyst Intern at Trip.com Group Ltd.",
      date: "June 2021 - Feburary 2022",
      skills: "Python, Selenium, Appium, Data Analytics",
      category: {
        tag: "Internship",
        color: "#D10363",
      },
      link: {
        url: "https://github.com/circle117/ImageScanningAndStitching",
        text: "Image Processing GitHub repository",
      },
    },
    {
      type: "project",
      text: "ChessBoard Problem Visualization",
      date: "October 2020",
      skills: "Python, PyQt, Algorithm",
      link: {
        url: "https://github.com/circle117/ChessBoard-Problem-Visualization",
        text: "GitHub repository",
      },
    },
    {
      type: "point",
      text: "Enrolled in Shanghai University",
      date: "September 2018",
    },
  ];

  return (
    timelineData.length > 0 && (
      <div>
        <div className="timeline-container">
          {timelineData.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
        </div>
      </div>
    )
  );
}
