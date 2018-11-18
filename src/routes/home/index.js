import { h, Component } from 'preact';
import style from './style';

class Home extends Component {
	state = {

	};

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}

export default Home;
