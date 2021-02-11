import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from './modal';

function Footer() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function goHome() {
    history.push('/');
  }

  return (
    <div>
      <footer>
        <button className="go-home" onClick={goHome}>
          Go home
        </button>
        <button className="open-rules" onClick={toggleModal}>
          Rules
        </button>
        <p className="footer__message">Have fun playing 🔏</p>
      </footer>
      {showModal ? (
        <Modal>
          <div className="modal__header">
            <h1>Rules</h1>
            <button className="desktop__button" onClick={toggleModal}>
              ⓧ
            </button>
          </div>
          <ul>
            <li>Hint Givers can say ONLY 1 word</li>
            <li>
              Words can be proper nouns, <em>but only 1 word</em>
            </li>
            <li>Guessers can only make 1 guess at a time</li>
            <li>First to 5 wins</li>
          </ul>
          <button className="mobile__button" onClick={toggleModal}>
            ( ❌ )
          </button>
        </Modal>
      ) : null}
    </div>
  );
}

export default Footer;
