class Header extends React.Component{
	render() {
		var name = this.props.name;
		var imageSrc = this.props.picture;
		return (
			React.createElement("div", {className : "container"},
				React.createElement("div", {className : "row"},
					React.createElement("div", { className : "col-xs-3",
																		   id : "picture",
																		   style : {display : "block"}},
						React.createElement("img", {src : imageSrc})
					),
					React.createElement("div", { className : "col-xs-9",
																			 id : "name"},
						React.createElement("h3", null, name)
					)
				)
		  )
		)
	};
}

class Tabs extends React.Component{
	render() {
	var about = parseProp(this.props.about);
	var menu = parseProp(this.props.menu);
	var tables = this.props.tables;
		return (
			React.createElement("div", {className : "container"},
			  React.createElement("div", {className : "row margin-top-20px"},
					React.createElement("div", {className : "col-xs-12"},
						React.createElement("ul", {className : "nav nav-tabs", id : "myTab"},
							React.createElement("li", {className : "active"},
								React.createElement("a", {"data-toggle" : "tab", href : "#aboutTab"}, "About")
							),
							React.createElement("li", null,
								React.createElement("a", {"data-toggle" : "tab", href : "#menuTab"}, "Menu")
							),
							React.createElement("li", null,
								React.createElement("a", {"data-toggle" : "tab", href : "#bookingsTab"}, "Bookings")
							)
						),
						React.createElement("div", {className : "tab-content"},
							React.createElement("div", {className : "tab-pane fade in active", id : "aboutTab"},
								React.createElement("div", null, about.map(function(item, index){
																								   return React.createElement("p", {key : index}, item)
																								 })
								),
								React.createElement("button",	{ className: "btn central-content", onClick: function onClick() {	return Utils.onBack(); } },	"___________")
							),
							React.createElement("div", {className : "tab-pane fade", id : "menuTab"},
								React.createElement("div", null, menu.map(function(item, index){
																									 return React.createElement("p", {key : index}, item);
																								 })
								),
								React.createElement("button",	{ className: "btn central-content", onClick: function onClick() {	return Utils.onBack(); } },	"___________")
							),
							React.createElement("div", {className : "tab-pane fade", id : "bookingsTab"},
								React.createElement("input", { className : "form-control",
																							 id : "date",
																						   name : "date",
																						   placeholder : "DD/MM/YYYY",
																						   type : "date"}),
								React.createElement("div", {id : "tables"},
									React.createElement("div", {className : "column tablesLayout"}, tables.map(function(item, index){
																																										if(item.Status === "1"){
																																											return React.createElement("img", {key : index, src : "img/table.jpg"})
																																										} else {
																																											return React.createElement("img", {key : index, src : "img/table1.jpg"})
																																										}
																																									})
									),
									React.createElement("button",	{ className: "btn central-content", onClick: function onClick() {	return Utils.onBack(); } },	"___________")
								)
							)
						)
					)
				)
			)
		);
	};
}

class DisplayRestaurant extends React.Component{
	render(){
		var currentRestaurant = findRestaurant(this.props.state.getState());
		return React.createElement("div",	null,
				React.createElement(Header, { name: currentRestaurant.Name, picture: currentRestaurant.Picture }),
				React.createElement(Tabs, { about: currentRestaurant.About, menu: currentRestaurant.Menu, tables: currentRestaurant.Tables })
			);
	}
}

function parseProp(prop){
	var results = [];
	var array = prop.split(";");
	return array;
}

function findRestaurant(state){
	var array = state[0].Restaurants;
	var id = state[0].CurrentRestaurant;
	return array.find((item) => item.Id === id );
}
