import { h } from 'preact';

import alphabet from '../alphabet';

const Letters = ({ gameResult, guess, guessed }) => (
  <div class="letters-column">
    {
      !gameResult
      ? alphabet.split('')
      .filter(l => !guessed.includes(l))
      .map(l => (
        <span>
          <button onClick={() => guess(l)} type="button">{l}</button>
        </span>
      ))
      : gameResult === 'success' ? (
        <h1>Finished!</h1>
      ) : gameResult === 'failure' ? (
        <h1>Failed.</h1>
      ) : ''
    }
  </div>
);

export default Letters;
