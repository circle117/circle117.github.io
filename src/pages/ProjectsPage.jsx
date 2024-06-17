import TimelineItem from "../components/TimelineItem";

export default function ProjectsPage() {
  const timelineData = [
    {
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
      text: "Sharded Key/Value Service Development",
      date: "March 2024",
      skills: "Go, Raft, RPC",
      category: {
        tag: "Distributed Systems",
        color: "#538392",
      },
      link: {
        url: "http://nil.csail.mit.edu/6.824/2022/labs/lab-shard.html",
        text: "See instructions here",
      },
    },
    {
      text: "MapReduce Framework Development",
      date: "Feburary 2024",
      skills: "Go, MapReduce, RPC",
      category: {
        tag: "Distributed Systems",
        color: "#538392",
      },
      link: {
        url: "https://pdos.csail.mit.edu/6.824/labs/lab-mr.html",
        text: "See instructions here",
      },
    },
    {
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
      text: "ChessBoard Problem Visualization",
      date: "October 2020",
      skills: "Python, PyQt, Algorithm",
      link: {
        url: "https://github.com/circle117/ChessBoard-Problem-Visualization",
        text: "GitHub repository",
      },
    },
  ];

  return (
    timelineData.length > 0 && (
      <div className="timeline-container">
        {timelineData.map((data, idx) => (
          <TimelineItem data={data} key={idx} />
        ))}
      </div>
    )
  );
}
