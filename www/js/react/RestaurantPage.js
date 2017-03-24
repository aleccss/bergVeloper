// !!! className : "pointer-events-none"

class Header extends React.Component{
	render() {
		var name = this.props.name;
		var imageSrc = this.props.picture;
		return ( React.createElement("div", null,
	             React.createElement("div",	{className : "container signInTop"},
	  				     React.createElement("div",	{className : "row", style : {height : "10px"}}),
	               React.createElement("div",	{className : "row"},
	                 React.createElement("div",	{className : "col-xs-2"},
	                   React.createElement("span", { className: "glyphicon glyphicon-chevron-left back-glyphicon", style  : {float : "left"}, onClick: function onClick() {	return Utils.goToAllPage(); } })
	                 ),
	                 React.createElement("div",	{className : "col-xs-8"},
	                   React.createElement("img",	{className : "logo-rest-list", src : "img/logo2.png"})
	                 ),
	                 React.createElement(DropdownMenu),
									 React.createElement(DisplayReservations)
	               ),
	               React.createElement("div",	{className : "row", style : {height : "10px"}})
	             ),
							 React.createElement("div", {className : "container", style : { paddingLeft: "0px", paddingRight: "0px"}},
				 				React.createElement("div", {className : "row rest-title-back"},
				 					React.createElement("div", { className : "col-xs-3",
				 																		   id : "picture",
				 																		   style : {display : "block"}},
				 						React.createElement("img", {src : imageSrc, style : {width : "90px", padding : "8px 0px 8px 8px"}})
				 					),
				 					React.createElement("div", { className : "col-xs-9",
				 																			 id : "name"},
				 						React.createElement("h4", { className : "rest-title" }, name)
				 					)
				 				)
				 		  )
	          )
					);
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
	var currentDateTime = new Date();
	var currentDateTimeSplit = currentDateTime.toISOString().split("T");
	var currentDate = currentDateTimeSplit[0];
	var currentTime = currentDateTimeSplit[1];
		return (
			React.createElement("div", {className : "container"},
			  React.createElement("div", {className : "row"},
					React.createElement("div", {className : "container"},
					  React.createElement("div", {className : "row"},
							React.createElement("ul", {className : "ul-navbar nav navbar-nav", id : "myTab"},
								React.createElement("li", {className : "active"},
								  React.createElement("div", {className : "col-xs-4"},
									  React.createElement("span", {className : "glyphicon glyphicon-info-sign", style : { display : "inline"}}),
										React.createElement("a", {"data-toggle" : "tab", href : "#aboutTab"}, "About")
								  )
								),
								React.createElement("li", null,
								   React.createElement("div", {className : "col-xs-4"},
								  React.createElement("span", {className : "glyphicon glyphicon-cutlery", style : { display : "inline"}}),
									React.createElement("a", {"data-toggle" : "tab", href : "#menuTab"}, "Menu"))
								),
								React.createElement("li", null,
								 React.createElement("div", {className : "col-xs-4"},
								  React.createElement("span", {className : "glyphicon glyphicon-edit", style : { display : "inline"}}),
									React.createElement("a", {"data-toggle" : "tab", href : "#bookingsTab"}, "Reservation"))
								)
							)
					  ),
						React.createElement("div", {className : "row tab-content"},
							React.createElement("div", {className : "tab-pane fade in active", id : "aboutTab"},
								React.createElement("div", {className : "margin-top-10px"}, about.map(function(item, index){
																								   return React.createElement("p", {key : index}, item)
																								 })
								)
							),
							React.createElement("div", {className : "row tab-pane fade", id : "menuTab"},
								React.createElement("div", {className : "margin-top-10px"}, menu.map(function(item, index){
																									 return React.createElement("p", {key : index}, item);
																								 })
								)
							),
							React.createElement("div", {className : "row tab-pane fade", id : "bookingsTab"},
								React.createElement("div", {className : "container" + classDisabled },
									React.createElement("div", {className : "row"},
										React.createElement("div", {className : "col-xs-7"},
											React.createElement("input", { className : "form-control",
																										 id : "date",
																									   name : "date",
																									   placeholder : "Date",
																									   type : "text",
																										 min : currentDate,
																										 onFocus : function onFocus() { document.getElementById("date").type = 'date'; },
																									   onChange : function onChange() { return timeChanged(); }})
										),
										React.createElement("div", {className : "col-xs-5"},
									 		React.createElement("input", { className : "form-control",
																									 	 id : "time",
																								   	 name : "time",
																								   	 placeholder : "Time",
																										 type : "text",
																										 min : currentTime,
																										 onFocus : function onFocus() { document.getElementById("time").type = 'time'; },
																									 	 onChange : function onChange() { return timeChanged(); }})
										)
									),
									React.createElement("div", { className : "row"},
										React.createElement(DisplayTables, { tables : tables }),
										React.createElement("button",	{ className: "btn reserveButton central-content margin-top-10px tablesLayout", onClick: function onClick() {	return bookPressed(); } },	"Reserve"),
										React.createElement("div", {className : "container alert alert-danger margin-top-10px", id:"noTableSelected", style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
							 	 		 React.createElement("strong", null, "ERROR! "),
							 			 "No table selected."
							 		 ),
									 React.createElement("div", {className : "container alert alert-danger margin-top-10px", id:"noDateTime", style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
										React.createElement("strong", null, "ERROR! "),
										"No date/time selected."
									),
									React.createElement("div", {className : "container alert alert-success margin-top-10px", id:"tableBooked", style : {display : "none", width : "90%", textAlign: "center", textTransform: "none"}},
									 React.createElement("strong", null, "SUCCESS! "),
									 "Tables successfully booked."
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

class DisplayTables extends React.Component{
	render(){
		var tables = this.props.tables;
		return React.createElement("div", { id : "tables", className : "column tablesLayout col-xs-12"},
												tables.map(function(item, index){
													var tableId = item.Id;
													if(tableId === "empty") {
														return React.createElement("img", { key : index,
																																src : "img/emptyTable.jpg"}
														)
													}
													//else if(item.Status === "1") {
													// 	return React.createElement("img", { id : tableId,
													// 																			key : index,
													// 																			src : "img/table.jpg",
													// 																			onClick : function onClick(tableId) { return tableClick(tableId); }}
													// 	)
													// }
													else {
														return React.createElement("img", { id : tableId,
																																key : index,
																																src : "img/table.jpg",
																																onClick : function onClick(tableId) { return tableClick(tableId); }}
														)
													}
												})
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
/** ---===== CODE =====--- **/

function parseProp(prop){
	var results = [];
	var array = prop.split(";");
	return array;
}

function findRestaurant(state){
	var array = Session.restaurants[0].Restaurants;
	var id = Session.restaurants[0].CurrentRestaurant;
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

	var restaurants = Session.restaurants[0].Restaurants;
	var currentRestaurantId = Session.restaurants[0].CurrentRestaurant;
	var currentRestaurant = restaurants.find((item) => item.Id === currentRestaurantId );
  var bookings = currentRestaurant.Bookings;

	var date = this.date + "T" + this.time;
	var selectedDate = new Date(date);
  updateTablesStatus(bookings, currentRestaurant, selectedDate);
	console.log("Selected Time: ",date," ",time);
}

function getAllBookedTables(bookings){
	var bookedTables = [];
	bookings.forEach(function(booking){
		booking.tableIds.forEach(function(id){
			bookedTables.push({Id : id, Status: "2",dateTime: booking.dateTime});
		});
	});
	return bookedTables;
}

function clearAllTables(tables){
	tables.forEach(function(table){
		if(table.Id !== "empty"){
		table.Status = "1";
		document.getElementById(table.Id).src = "img/table.jpg";
		document.getElementById(table.Id).className = document.getElementById(table.Id).className.replace("pointer-events-none", "");
	}
	});
}

function updateTablesStatus(bookings, currentRestaurant, selectedDate){
	var tables = currentRestaurant.Tables;
	var bookedTables = getAllBookedTables(bookings);
	clearAllTables(tables);
	if(bookedTables.length !== 0){
		tables.forEach(function(table){
			var shouldReserve = bookedTables.find(function(bookedTable){
				return bookedTable.Id === table.Id;
			});
			if(shouldReserve){
				var bookingDate = new Date(shouldReserve.dateTime);
				var dateIntervalEnd = Utils.addHours(bookingDate, 2);
				if(bookingDate <= selectedDate && selectedDate <= dateIntervalEnd){
							if(table.Id === "empty")
								return;
						if(shouldReserve.Id === table.Id){
							table.Status = "2";
							document.getElementById(table.Id).src = "img/table1.jpg";
							document.getElementById(table.Id).className = "pointer-events-none";
						}else{
							table.Status = "1";
							document.getElementById(table.Id).src = "img/table.jpg";
							document.getElementById(table.Id).className = document.getElementById(table.Id).className.replace("pointer-events-none", "");
						}
			}
		}
	});
}
}

function bookPressed(){
	if(!this.date || !this.time){
		Utils.showAndHideError("noDateTime");
		return;
	}
	var tables = document.getElementById("tables").children;
	var selectedTables = getSelectedTables(tables);
	if(selectedTables.length === 0){
		Utils.showAndHideError("noTableSelected");
		return;
	}
	var dateTime = this.date+"T"+this.time;
	var selectedDate = new Date(dateTime);
	var currentRestaurantId = Session.restaurants[0].CurrentRestaurant;
	var restaurants = Session.restaurants[0].Restaurants;
	var currentRestaurant = restaurants.find((item) => item.Id === currentRestaurantId );
	var booking = { userId : Session.loggedUser._id,
									restaurantId : currentRestaurantId,
									tableIds : selectedTables,
									dateTime : dateTime,
									restaurantName : currentRestaurant.Name
								};
	booking.tableIds.forEach(function(id){
		currentRestaurant.Tables.forEach(function(table){
			if(table.Id === "empty"){
					return;
			}
			if(id === table.Id){
					table.Status = "2";
					document.getElementById(table.Id).src = "img/table1.jpg";
					document.getElementById(table.Id).className = "pointer-events-none";
			}
		});
	});

  currentRestaurant.Bookings.push(booking);
	Model.processBooking(booking);
	Utils.showAndHideError("tableBooked");
}

function getSelectedTables(tables){
	var selectedTables = [];
	for(var i = 0; i < tables.length; i++){
		if(tables[i].className === "tableSelected"){
			selectedTables.push(tables[i].id);
		}
	}
	return selectedTables;
}
