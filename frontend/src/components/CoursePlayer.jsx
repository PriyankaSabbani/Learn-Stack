import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import YouTube from "react-youtube";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";


function CoursePlayer() {

  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;

  const [course, setCourse] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [completedLessons, setCompletedLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState({});

  // NOTES
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  // FETCH COURSE
  useEffect(() => {

    axios
      .get(`${API}/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

  }, [id, API]);

  // LOAD COMPLETED LESSONS
  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(`completed_${id}`)) || [];

    setCompletedLessons(saved);

  }, [id]);

  // LOAD VIDEO PROGRESS
  useEffect(() => {

    const savedProgress =
      JSON.parse(localStorage.getItem(`progress_${id}`)) || {};

    setLessonProgress(savedProgress);

  }, [id]);

  // LOAD NOTES
  useEffect(() => {

    const savedNotes =
      JSON.parse(localStorage.getItem(`notes_${id}`)) || [];

    setNotes(savedNotes);

  }, [id]);

  // EXTRACT YOUTUBE VIDEO ID
  const extractVideoId = (url) => {

    const videoId = url.split("v=")[1];
    return videoId ? videoId.split("&")[0] : "";

  };

  // MARK LESSON COMPLETED
  const markLessonCompleted = useCallback((index) => {

    if (!completedLessons.includes(index)) {

      const updated = [...completedLessons, index];

      setCompletedLessons(updated);

      localStorage.setItem(
        `completed_${id}`,
        JSON.stringify(updated)
      );

    }

  }, [completedLessons, id]);

  // PLAYER READY
  const onReady = (event) => {

    const playerInstance = event.target;

    setPlayer(playerInstance);

    const saved = lessonProgress[currentLessonIndex];

    if (saved) {

      const duration = playerInstance.getDuration();

      playerInstance.seekTo(duration * saved);

    }

  };

  // REAL TIME PROGRESS TRACKING
  useEffect(() => {

    if (!player || !course) return;

    const interval = setInterval(() => {

      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();

      if (!duration) return;

      const percent = currentTime / duration;

      const updatedProgress = {
        ...lessonProgress,
        [currentLessonIndex]: percent
      };

      setLessonProgress(updatedProgress);

      localStorage.setItem(
        `progress_${id}`,
        JSON.stringify(updatedProgress)
      );

      if (percent > 0.9) {
        markLessonCompleted(currentLessonIndex);
      }

      const totalLessons = course.lessons.length;

      let totalPercent = 0;

      for (let key in updatedProgress) {
        totalPercent += updatedProgress[key];
      }

      const overall = (totalPercent / totalLessons) * 100;

      setProgress(Math.floor(overall));

    }, 1000);

    return () => clearInterval(interval);

  }, [
    player,
    course,
    currentLessonIndex,
    lessonProgress,
    id,
    markLessonCompleted
  ]);

  // ADD NOTE WITH TIMESTAMP
  const addNote = () => {

    if (!player || noteText.trim() === "") return;

    const time = Math.floor(player.getCurrentTime());

    const newNote = {
      text: noteText,
      time
    };

    const updatedNotes = [...notes, newNote];

    setNotes(updatedNotes);

    localStorage.setItem(
      `notes_${id}`,
      JSON.stringify(updatedNotes)
    );

    setNoteText("");

  };

  // JUMP TO VIDEO TIME
  const jumpToTime = (time) => {

    if (player) {
      player.seekTo(time);
    }

  };

  if (!course) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const videoId = extractVideoId(currentLesson.videoUrl);

  return (

    <div>

      <Navbar />

      <div className="container mt-5">

        <div className="row">

          {/* VIDEO PLAYER */}

          <div className="col-lg-8">

            <div className="card shadow border-0 p-2">

              <YouTube
                key={currentLessonIndex}
                videoId={videoId}
                opts={{
                  width: "100%",
                  height: "480",
                  playerVars: { autoplay: 1 }
                }}
                onReady={onReady}
              />

            </div>

            <div className="mt-3">

              <h3 className="text-primary">
                {currentLesson.title}
              </h3>

              <p className="text-muted">
                <strong>Instructor:</strong>{" "}
                {course.instructor}
              </p>

              <p>{course.description}</p>

            </div>

            {/* NOTES SECTION */}

            <div className="row mt-4">

              <div className="col-md-6">

                <div className="card shadow border-0 p-3">

                  <h5>Add Notes</h5>

                  <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Write your note..."
                    value={noteText}
                    onChange={(e) =>
                      setNoteText(e.target.value)
                    }
                  />

                  <button
                    className="btn btn-primary"
                    onClick={addNote}
                  >
                    Add Note with Timestamp
                  </button>

                </div>

              </div>

              <div className="col-md-6">

                <div className="card shadow border-0 p-3">

                  <h5>My Notes</h5>

                  {notes.length === 0 && (
                    <p className="text-muted">
                      No notes yet
                    </p>
                  )}

                  <ul className="list-group">

                    {notes.map((note, index) => (

                      <li
                        key={index}
                        className="list-group-item"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          jumpToTime(note.time)
                        }
                      >

                        <strong>
                          {Math.floor(note.time / 60)}:
                          {("0" + (note.time % 60)).slice(-2)}
                        </strong>{" "}
                        - {note.text}

                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* SIDEBAR */}

          <div className="col-lg-4">

            {/* COURSE PROGRESS */}

            <div className="card shadow border-0 text-center p-4 mb-4">

              <h5>Course Progress</h5>

              <div style={{ width: 160, margin: "20px auto" }}>
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                />
              </div>

            </div>

            {/* LESSON LIST */}

            <div className="card shadow border-0">

              <div className="card-header bg-primary text-white">
                Lessons
              </div>

              <ul className="list-group list-group-flush">

                {course.lessons.map((lesson, index) => (

                  <li
                    key={index}
                    className={`list-group-item d-flex justify-content-between ${
                      index === currentLessonIndex
                        ? "active text-white"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setCurrentLessonIndex(index)
                    }
                  >

                    {lesson.title}

                    {completedLessons.includes(index) && (
                      <span>✔</span>
                    )}

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CoursePlayer;