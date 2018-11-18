import { h, Component } from 'preact';

import letters from './letters';

import style from './style';

class Home extends Component {
	state = {
		gameResult: null,
		hangmanString: '',
		guessed: []
	};

	componentDidMount() {
		// make request to service for hangman string...
		setTimeout(() => {
			this.setState({ hangmanString: 'test' });
		}, 2000);
	}

	guess(letter) {
		if (this.state.gameResult === 'failure') {
			return;
		}

		if (this.state.gameResult === 'success') {
			return;
		}

		this.setState(prevState => {
			const guessed = prevState.guessed.concat(letter);
			if (prevState.hangmanString.split('')
				.every(c => guessed.includes(c))
			) {
				return {
					guessed,
					gameResult: 'success'
				};
			}
			else if (guessed.length > 6) {
				return {
					guessed,
					gameResult: 'failure'
				};
			}
			else {
				return { guessed };
			}
		});
	}

	render({}, { hangmanString, gameResult, guessed }) {
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
												guessed.includes(c) ? c : '_'
											}
										</span>
									))
								}
							</div>
							<div class={style.lettersContainer}>
								{
									letters.split('').map(l => (
										<span class={style.btnContainer}>
											<button onClick={() => this.guess(l)} type="button">{l}</button>
										</span>
									))
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
