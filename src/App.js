import "./App.css";
import "./styles.css";
import { useEffect } from "react";
import { useVideoList } from "./context/video-listing";
import { useVideoPage } from "./context/video-page";
import { useLikedList } from "./context/liked-listing";
import { useHistoryList } from "./context/history-listing";
import { usePlaylist } from "./context/playlist-listing";
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";

function App() {
  const { VideoListing, setVideosInList } = useVideoList();
  const { Video } = useVideoPage();
  const { LikedListing } = useLikedList();
  const { HistoryListing } = useHistoryList();
  const { Playlists, Playlist } = usePlaylist();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://video-library-backend.harshdeshpande1.repl.co/videos"
        );
        setVideosInList(response.data.videos);
      } catch (error) {
        console.error("error", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <nav className="nav-main nav-primary">
        <div className="nav--logo">
          <p>
            Log<sub>N</sub>Video{" "}
          </p>
        </div>
        <ul className="list nav--list">
          <li className="nav-item">
            <NavLink
              end
              to="/videos"
              className="NavElement"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              VIDEOS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Playlists"
              className="NavElement"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              PLAYLISTS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Liked"
              className="NavElement"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              LIKED
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/History"
              className="NavElement"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              HISTORY
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="main">
        <Routes>
          <Route path="/" element={<VideoListing />} />
          <Route path="/videos" element={<VideoListing />} />
          <Route path="/video" element={<Video />} />
          <Route path="/Liked" element={<LikedListing />} />
          <Route path="/History" element={<HistoryListing />} />
          <Route path="/Playlists" element={<Playlists />} />
          <Route path="/Playlist" element={<Playlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
