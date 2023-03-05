import { useState } from "react";
import Modal from "./Modal";
import "./GameCard.css";

function GameCard({ db, id, name, url, author, publishedDate }) {
  const [existingGame, setExistingGame] = useState({
    name: name,
    url: url,
    author: author,
    publishedDate: publishedDate,
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleNewGameCreation = (e) => {
    setExistingGame({
      ...existingGame,
      [e.target.name]: e.target.value,
    });
  };

  const updateAndSaveGameToDB = async (e) => {
    e.preventDefault();

    setShowUpdateModal(false);

    if (existingGame.name && existingGame.url && existingGame.author) {
      await db.games
        .update(id, {
          name: existingGame.name,
          url: existingGame.url,
          author: existingGame.author,
          publishedDate: existingGame.publishedDate,
        })
        .catch((e) => console.log("Something went wrong while saving game.."));
    }

    setExistingGame({
      name: name,
      url: url,
      author: author,
      publishedDate: publishedDate,
    });
  };

  console.log(db);
  console.log(id);
  const handleDeleteGame = async (e) => {
    await db.games.delete(id);
  };

  const handleUpdateGame = () => {
    setShowUpdateModal(true);
  };
  return (
    <div className="gamecard">
      <div className="gamecard_section">
        <div className="gamecard_prop">Name</div>
        <div className="gamecard_value">{name}</div>
      </div>
      <div className="gamecard_section">
        <div className="gamecard_prop">Url</div>
        <div className="gamecard_value">{url}</div>
      </div>
      <div className="gamecard_section">
        <div className="gamecard_prop">Author</div>
        <div className="gamecard_value">{author}</div>
      </div>
      <div className="gamecard_section">
        <div className="gamecard_prop">Published Date</div>
        <div className="gamecard_value">{publishedDate?publishedDate:"Not Entered"}</div>
      </div>

      <div className="gamecard_buttons">
        <button className="gamecard_button" onClick={handleDeleteGame}>
          Delete
        </button>
        <button className="gamecard_button" onClick={handleUpdateGame}>
          Update
        </button>
      </div>

      {showUpdateModal ? (
        <Modal>
          <div className="modal">
            <div className="modal_content">
              <h3 className="modalheader">Update {name}</h3>
              <form>
                <label>
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={existingGame.name}
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
                    value={existingGame.url}
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
                    value={existingGame.author}
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
                    value={existingGame.publishedDate}
                    placeholder="Enter Published Date"
                    onChange={handleNewGameCreation}
                    className="logininput"
                  />
                </label>
              </form>
              <div className="modalbuttons">
                <button className="modalbutton" onClick={updateAndSaveGameToDB}>
                  Update and Save
                </button>
                <button
                  className="modalbutton"
                  onClick={(e) => setShowUpdateModal(false)}
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
    </div>
  );
}

export default GameCard;
