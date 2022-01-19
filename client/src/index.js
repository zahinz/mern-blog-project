import React from "react";
import ReactDOM from "react-dom";

// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

// styling
import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* navigate to same like stack router, better add replace in the parameter*/}
      <Route path="/myapp" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          {/* using useparam here */}
          <Route path=":courseid" element={<SingleCourse />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home() {
  return (
    <>
      <h1>This is home component</h1>
    </>
  );
}

function Learn() {
  return (
    <>
      <h1>This Learn Component</h1>
      <h4>All lesson listed here</h4>
      <Link to="/learn">back</Link> |{"\u00A0"}
      <Link to="/learn/courses">courses</Link> |{"\u00A0"}
      <Link to="/learn/bundles">bundle</Link>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "NextJS"];
  const randomCourseList =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <>
      <h2>All courses listed here</h2>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "gray" : "white",
            padding: isActive ? "0.8rem" : "0rem",
            borderRadius: isActive ? "8px" : "0rem",
            color: isActive ? "white" : "black",
            textDecoration: isActive ? "none" : "none",
          };
        }}
        to={`/learn/courses/${randomCourseList.toLowerCase()}`}
      >
        {randomCourseList}
      </NavLink>{" "}
      |{"\u00A0"}
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "gray" : "white",
            padding: isActive ? "0.8rem" : "0rem",
            borderRadius: isActive ? "8px" : "0rem",
            color: isActive ? "white" : "black",
            textDecoration: isActive ? "none" : "none",
          };
        }}
        to={`/learn/courses/navlink`}
      >
        Navlink
      </NavLink>
      <Outlet />
    </>
  );
}

function SingleCourse() {
  const navigate = useNavigate();
  const { courseid } = useParams();
  return (
    <>
      <h4>URL params is : {courseid} </h4>
      <button
        onClick={() => {
          navigate("/dashboard", { state: courseid });
        }}
      >
        Price
      </button>
      <Link to="/dashboard" state={"Phyton"}>
        Phyton
      </Link>
    </>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <h4>The info that I carry</h4>
      <h5>Price : {location.state}</h5>
    </>
  );
}

function Bundles() {
  return (
    <>
      <h2>Promo bundle listed here</h2>
    </>
  );
}
