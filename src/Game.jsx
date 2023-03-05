import { useState } from "react";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import Modal from "./Modal";
import "./Game.css";
import GameCard from "./GameCard";

function Game() {
  const [showModal, setShowModal] = useState(false);
  const db = new Dexie("gamesdb");

  db.version(1).stores({ games: "++id,name,url,author,publishedDate" });

  const [newGame, setNewGame] = useState({
    name: "",
    url: "",
    author: "",
    publishedDate: "",
  });

  const handleCreateGame = () => {
    setShowModal(true);
  };

  const handleNewGameCreation = (e) => {
    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value,
    });
  };

  const saveGameToDB = async (e) => {
    e.preventDefault();

    setShowModal(false);

    if (newGame.name && newGame.url && newGame.author) {
      await db.games
        .add({
          name: newGame.name,
          url: newGame.url,
          author: newGame.author,
          publishedDate: newGame.publishedDate,
        })
        .catch((e) => console.log("Something went wrong while saving game.."));
    }

    setNewGame({
      name: "",
      url: "",
      author: "",
      publishedDate: "",
    });
  };

  const allGames = useLiveQuery(() => db?.games?.toArray(), []);

  console.log(allGames);

  return (
    <div className="game_page">
      {/*Header*/}
      <div className="game_header">
        <h2 className="game_header-title">Create Simple Games</h2>
        <button onClick={handleCreateGame} className="game_header-button">
          Create 🚀
        </button>
      </div>
      <div className="game_body"></div>

      {showModal ? (
        <Modal>
          <div className="modal">
            <div className="modal_content">
              <h3 className="modalheader">Create New Game</h3>
              <form>
                <label>
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={newGame.name}
                    placeholder="Enter your name"
                    onChange={handleNewGameCreation}
                    className="logininput"
                  />
                </label>
                <label>
                  <h4>Url</h4>
                  <input
                    type="text"
                    name="url"
                    value={newGame.number}
                    placeholder="Enter Url"
                    onChange={handleNewGameCreation}
                    className="logininput"
                  />
                </label>
                <label>
                  <h4>Author</h4>
                  <input
                    type="text"
                    name="author"
                    value={newGame.number}
                    placeholder="Enter Author name"
                    onChange={handleNewGameCreation}
                    className="logininput"
                  />
                </label>
                <label>
                  <h4>PublishedDate</h4>
                  <input
                    type="text"
                    name="publishedDate"
                    value={newGame.number}
                    placeholder="Enter Published Date"
                    onChange={handleNewGameCreation}
                    className="logininput"
                  />
                </label>
              </form>
              <div className="modalbuttons">
                <button className="modalbutton" onClick={saveGameToDB}>
                  Create
                </button>
                <button
                  className="modalbutton"
                  onClick={(e) => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div className="gamecards">
        {allGames?.length > 0 ? (
          allGames?.map((game) => (
            <GameCard
              db={db}
              id={game.id}
              name={game.name}
              url={game.url}
              author={game.author}
              publishedDate={game.publishedDate}
            />
          ))
        ) : (
          <div className="nogame_header">
            <h1>Start Creating Simple Games by pressing the button on top right 🚀</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
