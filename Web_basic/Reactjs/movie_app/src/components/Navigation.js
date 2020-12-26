import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css'

function Navigation (){
	return(
		<div className='navigation'>
			<Link className='Home' to="/">Home</Link>
			<Link className='About' to='/about'>About</Link>
		</div>
    );
}

export default Navigation;