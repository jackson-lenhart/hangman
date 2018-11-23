import { h } from 'preact';

const FullGuess = ({ fullGuess, gameResult, handleChange }) => (
  <div class="full-guess-column">
    {
      !gameResult ? (
        <div>
          <textarea
            rows="5"
            cols="30"
            onChange={handleChange}
          />
          <button onClick={fullGuess} type="button">Full Guess</button>
        </div>
      ) : gameResult === 'success' ? (
        <h1>Finished!</h1>
      ) : gameResult === 'failure' ? (
        <h1>Failed.</h1>
      ) : ''
    }
  </div>
);

export default FullGuess;
