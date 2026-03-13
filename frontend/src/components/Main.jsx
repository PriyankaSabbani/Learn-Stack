import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const infoRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleLearnMore = () => {
    setShowInfo(true);

    setTimeout(() => {
      infoRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>

      <div className="container mt-4 mt-md-5">

        <div className="row align-items-center text-center text-md-start">

          
          <div className="col-12 col-md-6 mb-4 mb-md-0">

            <h1 className="fw-bold text-primary mb-3 display-5 display-md-4">
              Learn Without Limits
            </h1>

            <h2 className="fw-bold mb-3">
              Welcome to <span className="text-primary">LEARN STACK</span>
            </h2>

            <p className="lead fw-normal mb-4">
              Master modern technologies, build real world projects,
              and track your learning journey with our smart course
              progress system.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">

              <button
                className="btn btn-outline-primary btn-lg mb-3 mb-sm-0 me-sm-3"
                onClick={handleLearnMore}
              >
                Learn More
              </button>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/courses")}
              >
                Get Started
              </button>

            </div>

          </div>

          
          <div className="col-12 col-md-6 text-center">

            <img
              src="./images/learnstack_image.png"
              alt="learn stack"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto" }}
            />

          </div>

        </div>

      </div>


     
      <div className="container mt-5">

        <h2 className="text-center text-primary fw-bold mb-5">
          Why Choose Learn Stack?
        </h2>

        <div className="row text-center">

          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white h-100">

              <h4 className="text-primary">Learn Faster</h4>

              <p className="text-muted">
                Our platform provides structured learning paths
                so you can master programming and technologies
                much faster than traditional learning methods.
              </p>

            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white h-100">

              <h4 className="text-primary">Track Progress</h4>

              <p className="text-muted">
                Visual indicators like progress bars help you
                monitor your learning journey and stay motivated.
              </p>

            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white h-100">

              <h4 className="text-primary">Real Skills</h4>

              <p className="text-muted">
                Build practical projects and gain real-world
                development experience for industry jobs.
              </p>

            </div>
          </div>

        </div>

      </div>


      {showInfo && (

        <div ref={infoRef} className="container mt-5">

          <div className="p-4 p-md-5 shadow rounded bg-light">

            <h3 className="text-center text-primary mb-4">
              About Learn Stack
            </h3>

            <p className="text-muted">
              Learn Stack is an online learning platform designed to help students
              and aspiring developers build strong technical skills through
              structured and easy-to-follow courses. Our platform focuses on
              practical learning and real-world examples.
            </p>

            <p className="text-muted">
              We believe learning should be simple and engaging. Our courses
              guide learners step-by-step through complex topics and help
              them build confidence with hands-on experience.
            </p>

            <p className="text-muted">
              Our progress tracking system allows learners to monitor their
              course completion and stay motivated while achieving their goals.
            </p>

            <p className="text-muted">
              Learn Stack focuses on building real-world skills by encouraging
              learners to work on projects and practical coding challenges.
            </p>

            <p className="text-muted">
              With structured learning paths and real practice,
              Learn Stack helps you become a confident developer
              ready for real-world opportunities.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Main;