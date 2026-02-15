import TimelineItem from "../components/TimelineItem";
import { useEffect, useState } from "react";

export default function ExperiencePage() {
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
      type: "point",
      text: "Graduated from University of British Columbia",
      date: "December 2025",
    },
    {
      type: "project",
      text: "Software Development Intern at Demonware",
      date: "Sep. 2024 - Aug. 2025",
      skills: "Python, MySQL, Docker, Jenkins, Git",
      category: {
        tag: "Internship",
        color: "#D10363",
      },
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
      date: "Apr. 2024",
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
      date: "Mar. 2024",
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
      date: "Mar. 2024",
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
      date: "Feb. 2024",
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
      date: "Nov. 2022",
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
      date: "Jan. 2022 - Jun. 2022",
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
      text: "Software Development Intern at Trip.com",
      date: "Jun. 2021 - Feb. 2022",
      skills: "Python, Flask, Selenium, Appium",
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
      date: "Oct. 2020",
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

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {timelineData.length > 0 && (
        <div>
          {/* title */}
          <div className="text-center mb-8">
            <p className="text-l mb-2 text-secondary">More About Me</p>
            <p className="text-4xl text-primary font-semibold">Experience</p>
          </div>
          {/* timeline */}
          <div className="timeline-container">
            {timelineData.map((data, idx) => (
              <TimelineItem data={data} key={idx} />
            ))}
          </div>
        </div>
      )}
      {/* back to the top button
      {true && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 bottom-6 z-50 cursor-pointer
               transition transform hover:-translate-y-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 text-primary rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}
