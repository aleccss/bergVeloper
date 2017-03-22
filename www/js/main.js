function findCurrentPage(state){
		var currentPage;
		if(state){
			currentPage = state.getState()[0].CurrentPage;
		} else {
			currentPage = "";
		}
		var app;
		if(currentPage === "all"){
			app = React.createElement("div",null,
							React.createElement(AllRestaurants, { restaurants : state.getState()[0].Restaurants,
																										filtered : state.getState()[0].Filtered,
																										state : state})
						);
		} else if(currentPage === "display"){
			app = React.createElement("div", null,
					 	  React.createElement(DisplayRestaurant, {state : state})
					  );
		} else if(currentPage === "login"){
			app = React.createElement(LoginPage);
		} else {			
			app = React.createElement("img", {src : "img/logo2.jpg"});
		}
		return app;
}

class App extends React.Component {
	render() {
		var state = this.props.state;
		var app = findCurrentPage(state);
		return app;
	}
}

window.render = function(state){
	ReactDOM.render(React.createElement(App, {state: state}), document.getElementById("reactApp"));
}

window.render(Session.appState);
