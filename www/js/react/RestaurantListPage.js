var SearchBox = React.createClass({
    doSearch : function(){
    var query = this.refs.searchInput.value;
    this.props.doSearch(query);
    },
    render : function(){
        return React.createElement("input", { className : "searchBox form-control margin-top-10px",
                                              type : "text",
                                              ref : "searchInput",
                                              placeholder : "Search Restaurant",
                                              value : this.props.query,
                                              onChange : this.doSearch });
    }
});

var DisplayTable = React.createClass({
    doSearch : function(queryText){
      var queryResult=[];
      this.props.data.forEach(function(item){
          if(item.Name.toLowerCase().indexOf(queryText)!=-1)
          queryResult.push(i);
      });

      this.setState({
          query: queryText,
          filteredData: queryResult
      })
    },
    render : function(){
      var rows=[];
      this.props.query.forEach(function(item,index) {
      rows.push(
          React.createElement("li", {className : "rest-list list-group-item", onClick : function onClick() { return displayRestaurant(item.Id) }, key : index},
            React.createElement("img", {className : "rest-small-img", src : item.Picture}),
            React.createElement("h5", {style : {marginTop : "5px", paddingTop : "8px"}}, item.Name)
          )
        );
      });
      return React.createElement("ul", {className : "list-group margin-top-20px"}, rows);
    }
});

var InstantBox = React.createClass({
  doSearch : function(queryText){
    var queryResult=[];
    queryText = queryText.toLowerCase();
    this.props.data.forEach(function(item){
        if(item.Name.toLowerCase().indexOf(queryText)!=-1)
        queryResult.push(item);
    });
    this.setState({
        query: queryText,
        filteredData: queryResult
    })
  },
  getInitialState : function(){
    return{
        query:'',
        filteredData: this.props.data
    }
  },
  render : function(){
    return React.createElement("div", {className : "InstantBox central-content"},
      React.createElement(SearchBox, {query : this.state.query, doSearch : this.doSearch }),
      React.createElement(DisplayTable, {query : this.state.filteredData})
    );
  }
});

class DisplayReservations extends React.Component{
  render () {
    var rows = getDisplayRestaurantsRows(Session.loggedUser);
    return React.createElement("div", { className : "modal",
                                 id : "myres"},
      React.createElement("div", { className : "modal-content"},
        React.createElement("span", { className : "close",
                                      onClick : () => closeClick()}, "x"),
        React.createElement("ul", {className : "list-group"}, rows)
      )
    );
  }
}

class AllRestaurants extends React.Component{
	render() {
		var list = this.props.restaurants;
		var filtered = this.props.filtered;
		var state = this.props.state.getState();
    Utils.setLoggedUser(window.localStorage.getItem("loggedUser"));
    var classHidden = "";
      if(Session.loggedUser){
        classHidden = " hidden";
      }
		return React.createElement("div", null,
             React.createElement("div",	{className : "container signInTop"},
  				     React.createElement("div",	{className : "row", style : {height : "10px"}}),
               React.createElement("div",	{className : "row"},
                 React.createElement("div",	{className : "col-xs-2"},
                   React.createElement("span", { className: "glyphicon glyphicon-chevron-left back-glyphicon" + classHidden, style  : {float : "left"}, onClick: function onClick() {	return Utils.goToLogin(); } })
                 ),
                 React.createElement("div",	{className : "col-xs-8"},
                   React.createElement("img",	{className : "logo-rest-list", src : "img/logo2.png"})
                 ),
                 React.createElement(DropdownMenu),
                 React.createElement(DisplayReservations)
               ),
               React.createElement("div",	{className : "row", style : {height : "10px"}})
             ),
             React.createElement("div", {className : "container margin-top-20px"},
               React.createElement("div",	{className : "row search"},
                 React.createElement("div",	null,
                   React.createElement(InstantBox, {data : list})
                 )
               )
             )
           );
  };
}

class DropdownMenu extends React.Component{
  render() {
    var classHidden = "";
      if(!Session.loggedUser){
        classHidden = " hidden";
      }
    return React.createElement("div",	{className : "col-xs-2 dropdown"},
      React.createElement("span", { id : "dropDownMenu",
                                    className : "glyphicon glyphicon-menu-hamburger back-glyphicon dropdown-toggle" + classHidden,
                                    style  : {float : "right"},
                                    "data-toggle" : "dropdown"
                                  }),
      React.createElement("ul", {className : "hamb-menu dropdown-menu", "aria-labelledby" : "dropDownMenu"},
        React.createElement("li", null,
          React.createElement("a", { style : { color : "white"}, onClick : () => myResClick()}, "My Reservations")
        ),
        React.createElement("li", null,
          React.createElement("a", { style : { color : "white"}, onClick : function onClick() { return signOut(); }}, "Sign out")
        )
      )
    );
  }
}
/** ---===== CODE =====--- **/

function getDisplayRestaurantsRows(data) {
  var rows = [];
  if(data && data.bookings.length > 0){
    data.bookings.forEach(function(item, index) {
      rows.push(
          React.createElement("li", {className : "rest-list list-group-item", key : index},
            React.createElement("div", {className : "col-xs-2"}, item.restaurantId),
            React.createElement("div", {className : "col-xs-4"}, item.dateTime),
            React.createElement("div", {className : "col-xs-2"}, item.tableIds.length)
          )
      );
    });
  }
  return rows;
}

window.onclick = function(event) {
	var myRes = document.getElementById("myres");
  if(event.target == myRes) {
    myRes.style.display = "none";
  }
}
function myResClick() {
	var myRes = document.getElementById("myres");
	myRes.style.display = "block";
}
function closeClick() {
	var myRes = document.getElementById("myres");
  myRes.style.display = "none";
}

function displayRestaurant(id){
  var data = Session.restaurants;
  data[0].CurrentRestaurant = id;
  data[0].CurrentPage = "display";
  var appState = new Utils.State(data, Utils.handler);
  Session.appState = appState;
  render(appState);
}

function showReservations(){
  console.log("showReservationsPressed");
}
function signOut(){
  window.localStorage.setItem("loggedUser", null);
  Session.loggedUser = null;
  Utils.goToLogin();
}
