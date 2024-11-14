import Hello from './components/Hello';
import RainEffect from './components/RainEffect'

const App = () => {
  return (
		<div className='bg-slate-300'>
			<RainEffect />
			<Hello />
		</div>
  );
}

export default App