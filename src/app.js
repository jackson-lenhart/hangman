import { h, Component } from 'preact';

import FullGuess from './components/full-guess';
import Letters from './components/letters';
import Viz from './components/viz';

export default class App extends Component {
	state = {
		gameResult: null,
		hangmanString: '',
		guessed: [],
		wrongGuesses: 0,
		fullGuess: ''
	};

	componentDidMount() {
		// make request to service for hangman string...
		fetch('http://localhost:6969/')
		.then(res => res.text())
		.then(str => {
			this.setState({
				hangmanString: 'Hello my name is Chuck Norris'
			});
		});
	}

	fullGuess() {
		const guess = this.state.fullGuess;
		if (guess === this.state.hangmanString) {
			this.setState({
				gameResult: 'success',
			});
		}
		else if (this.state.wrongGuesses >= 7) {
			this.setState(prevState => ({
				gameResult: 'failure',
				wrongGuesses: prevState.wrongGuesses + 1
			}));
		}
		else {
			this.setState(prevState => ({
				wrongGuesses: prevState.wrongGuesses + 1
			}));
		}
	}

	guess(letter) {
		const { hangmanString, gameResult, wrongGuesses } = this.state;

		if (gameResult === 'failure') {
			return;
		}

		if (gameResult === 'success') {
			return;
		}

		const letters = hangmanString.split('')
			.filter(c => /[A-Z0-9]/i.test(c))

		const uniqueLetters = [];
		for (const c of letters) {
			const l = c.toLowerCase();
			if (!uniqueLetters.includes(l)) {
				uniqueLetters.push(l);
			}
		}

		if (uniqueLetters.includes(letter.toLowerCase())
			&& !this.state.guessed.includes(letter.toLowerCase())
		) {
			this.setState(prevState => {
				const guessed = prevState.guessed.concat(letter);
				return {
					guessed,
					gameResult: guessed.length >= uniqueLetters.length
						? 'success' : prevState.gameResult
				};
			});
		}
		else if (wrongGuesses >= 7) {
			this.setState(prevState => ({
				gameResult: 'failure',
				wrongGuesses: prevState.wrongGuesses + 1
			}));
		}
		else {
			this.setState(prevState => ({
				wrongGuesses: prevState.wrongGuesses + 1
			}));
		}
	}

	handleChange(e) {
		this.setState({
			fullGuess: e.target.value
		});
	}

	render({}, { hangmanString, gameResult, guessed, wrongGuesses }) {
		return (
			<div class="container">
				{
					hangmanString
					? (
						<div>
              <div class="game-table">
                <FullGuess
                  fullGuess={this.fullGuess.bind(this)}
                  gameResult={gameResult}
                  handleChange={this.handleChange.bind(this)}
                />
                <Viz wrongGuesses={wrongGuesses} />
  							<Letters
                  gameResult={gameResult}
                  guess={this.guess.bind(this)}
                  guessed={guessed}
                />
              </div>
              <div class="blanks-container">
								{
									hangmanString.split('').map(c => (
										<span class="blank">
											{
												gameResult === 'success' ? c : (
													guessed.includes(c.toLowerCase()) ? c : '_'
												)
											}
										</span>
									))
								}
							</div>
						</div>
					) : (
						<h1>Loading hangman string...</h1>
					)
				}
			</div>
		);
	}
}
