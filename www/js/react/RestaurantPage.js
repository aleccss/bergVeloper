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
	var classDisabled = "";
		if(!Session.loggedUser){
			classDisabled = " disabled";
		}
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
								React.createElement("div", {className : "container" + classDisabled },
									React.createElement("div", {className : "row"},
										React.createElement("div", {className : "col-xs-7"},
											React.createElement("input", { className : "form-control",
																										 id : "date",
																									   name : "date",
																									   placeholder : "Select Date",
																									   type : "date"})
										),
										React.createElement("div", {className : "col-xs-5"},
									 		React.createElement("input", { className : "form-control",
																									 	 id : "time",
																								   	 name : "time",
																								   	 placeholder : "Select Time",
																								   	 type : "time",
																									 	 onChange : function onChange() { return timeChanged(); }})
										)
									),

									React.createElement("div", { className : "row" },
										React.createElement("div", { id : "tables", className : "column tablesLayout col-xs-12"},
																				tables.map(function(item, index){
																					var tableId = item.Id;
																					if(item.Status === "1") {
																						return React.createElement("img", { id : tableId,
																																								key : index,
																																								src : "img/table.jpg",
																																								onClick : function onClick(tableId) { return tableClick(tableId); }}
																						)
																					} else if(tableId === "empty") {
																						return React.createElement("img", { key : index,
																																								src : "img/emptyTable.jpg"}
																						)
																					} else {
																						return React.createElement("img", { id : tableId,
																																								className : "pointer-events-none",
																																								key : index,
																																								src : "img/table1.jpg",
																																								onClick : function onClick(tableId) { return tableClick(tableId); }}
																						)
																					}
																				})
										),
										React.createElement("button",	{ className: "btn btn-warning central-content", onClick: function onClick() {	return bookPressed(); } },	"Reserve"),
										React.createElement("button",	{ className: "btn central-content", onClick: function onClick() {	return Utils.onBack(); } },	"___________"),
										React.createElement("div", {className : "alert alert-danger", id:"noTableSelected", style : {display : "none"}},
							 	 		 React.createElement("strong", null, "Error! "),
							 			 "No table selected."
							 		 ),React.createElement("div", {className : "alert alert-danger", id:"noDateTime", style : {display : "none"}},
										React.createElement("strong", null, "Error! "),
										"No date/time selected."
									)
									)
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

function tableClick(input){
	var tableId = input.currentTarget.id;
	if (document.getElementById(tableId).className === "tableSelected") {
		document.getElementById(tableId).className = "";
	} else {
		document.getElementById(tableId).className = "tableSelected";
	}
}

function timeChanged(){
	this.date = document.getElementById("date").value;
	this.time = document.getElementById("time").value;

	console.log("Selected Time: ",date," ",time);
}

function bookPressed(){
	if(!this.date.value || !this.time.value){
		Utils.showAndHideError("noDateTime");
		return;
	}
	var selectedTables = getSelectedTables();
	if(selectedTables.length === 0){
		Utils.showAndHideError("noTableSelected");
		return;
	}
	var dateTime = this.date+"T"+this.time;
	var selectedDate = new Date(dateTime);
	var booking = { userId : Session.loggedUser._id,
									restaurantId : Session.restaurants[0].CurrentRestaurant,
									tableIds : selectedTables,
									dateTime : selectedDate
								};
	Model.processBooking(booking);
}

function getSelectedTables(){
	var tables = document.getElementById("tables").children;
	var selectedTables = [];
	for(var i = 0; i < tables.length; i++){
		if(tables[i].className === "tableSelected"){
			selectedTables.push(tables[i].id);
		}
	}
	return selectedTables;
}
