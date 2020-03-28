import React from 'react';

function Header({ title, children }){
	return (
		<header>
			<h1>{children}</h1>
			<span>{title}</span>
		</header>
	);
}

export default Header;