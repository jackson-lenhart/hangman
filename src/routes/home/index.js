import { h, Component } from 'preact';

import letters from './letters';

import style from './style';

class Home extends Component {
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
				hangmanString: str
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
			<div class={style.home}>
				{
					hangmanString
					? (
						<div>
							<h1>Take your guess</h1>
							<div class={style.blanksContainer}>
								{
									hangmanString.split('').map(c => (
										<span class={style.blank}>
											{
												gameResult === 'success' ? c : (
													guessed.includes(c.toLowerCase()) ? c : '_'
												)
											}
										</span>
									))
								}
							</div>
							<div class={style.lettersContainer}>
								{
									letters.split('')
									.filter(l => !guessed.includes(l))
									.map(l => (
										<span class={style.btnContainer}>
											<button onClick={() => this.guess(l)} type="button">{l}</button>
										</span>
									))
								}
							</div>
							<div>
								{
									!gameResult ? (
										<div>
											<textarea onChange={this.handleChange.bind(this)} />
											<button onClick={this.fullGuess.bind(this)} type="button">Full Guess</button>
										</div>
									) : ''
								}
								{
									<h2>{wrongGuesses} wrong guesses</h2>
								}
							</div>
						</div>
					) : (
						<h1>Loading hangman string...</h1>
					)
				}
				{
					gameResult === 'success' ? (
						<h1>Finished!</h1>
					) : ''
				}
				{
					gameResult === 'failure' ? (
						<h1>Failed!</h1>
					) : ''
				}
			</div>
		);
	}
}

export default Home;
