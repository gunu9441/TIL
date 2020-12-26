import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Detail from './routes/Detail';
import Navigation from './components/Navigation';

function App(){
	return(
		<HashRouter>
			<Navigation/>
			<Route exact path='/' component={Home}/>
			<Route path='/about' component={About}/>
			<Route path='/movie-detail' component={Detail}/>
		</HashRouter>	
	);
}

export default App;