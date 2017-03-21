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
            React.createElement("h5", {style : {fontWeight : "bold"}}, item.Name)
          )
        );
      });
      return React.createElement("ul", {className : "list-group margin-top-20px"}, rows,
               React.createElement("button", {className : "btn central-content", onClick : function onClick() { return goToLogin()}}, "Create User")
             );
    }
});

var InstantBox = React.createClass({
  doSearch : function(queryText){
    var queryResult=[];
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

class AllRestaurants extends React.Component{
	render() {
		var list = this.props.restaurants;
		var filtered = this.props.filtered;
		var state = this.props.state.getState();
		return React.createElement("div",	{className : "container"},
				     React.createElement("div",	{className : "row", style : {height : "10px"}}),
             React.createElement("div",	{className : "row"},
               React.createElement("div",	{className : "col-xs-12"},
                 React.createElement("img",	{className : "logo-rest-list", src : "img/logo.jpg"})
               )
             ),
             React.createElement("div",	{className : "row", style : {height : "10px"}}),
             React.createElement("div",	{className : "row search"},
               React.createElement("div",	null,
                 React.createElement(InstantBox, {data : list})
               )
             )
			     );
  };
}

function displayRestaurant(id){
  var data = Session.restaurants;
  data[0].CurrentRestaurant = id;
  data[0].CurrentPage = "display";
  var appState = new Utils.State(data, Utils.handler);
  Session.appState = appState;
  render(appState);
}
function goToLogin(){
  var data = [];
  data.push({CurrentPage : "login"});
  var appState = new Utils.State(data, window.handler);
  Session.appState = appState;
  render(appState);
}
