import { h } from 'preact';

const HangmanViz = ({ wrongGuesses }) => (
  <div class="viz-column">
    <svg height="200" width="200">
      <g>
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="200"
          stroke={wrongGuesses >= 1 ? "white" : ""}
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke={wrongGuesses >= 1 ? "white" : ""}
        />
        <circle
          cx="100"
          cy="50"
          r={wrongGuesses >= 2 ? "25" : "0"}
          stroke="white"
          stroke-width="1"
          fill="none"
        />
        <line
          x1="100"
          y1="75"
          x2="100"
          y2="130"
          stroke={wrongGuesses >= 3 ? "white" : ""}
        />
        <line
          x1="100"
          y1="95"
          x2="70"
          y2="115"
          stroke={wrongGuesses >= 4 ? "white" : ""}
        />
        <line
          x1="100"
          y1="95"
          x2="130"
          y2="115"
          stroke={wrongGuesses >= 5 ? "white" : ""}
        />
        <line
          x1="100"
          y1="130"
          x2="85"
          y2="160"
          stroke={wrongGuesses >= 6 ? "white" : ""}
        />
        <line
          x1="100"
          y1="130"
          x2="115"
          y2="160"
          stroke={wrongGuesses >= 7 ? "white" : ""}
        />
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="25"
          stroke={wrongGuesses >= 8 ? "white" : ""}
        />
      </g>
    </svg>
  </div>
);

export default HangmanViz;
