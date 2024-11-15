import Hello from './components/Hello';
import RainEffect from './components/RainEffect'

const App = () => {
  return (
		<div className='bg-sky-900 select-none'>
			<Hello />
			<RainEffect />
		</div>
  );
}

export default App