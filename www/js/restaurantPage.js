
var previousState;

class AllRestaurants extends React.Component{
		render() {
			var list = this.props.restaurants;
			var filtered = this.props.filtered;
			var state = this.props.state.getState();
			return (
				<div className="container">
					<div className="row" style={{ height : "60px"}}>
					</div>
					<div className="row">
						<div className="col-md-12">
							<img src="img/logo.jpg" className="logo"/>
						</div>
					</div>
					<div className="row" style={{height : "40px"}}>
					</div>
					<div className="row">
						<div className="search">
							<InstantBox data={list}/>
						</div>
					</div>
				</div>
			);
		}
	}

	class Header extends React.Component{
		render() {
			var name = this.props.name;
			var imageSrc = this.props.picture;
			return (
				<div className="container">
					<div className="row margin-top-20px">
						<div id="picture" className="col-xs-4" style={{ display : "block" }}>
							<img src={imageSrc} style={{ width : "100%" }} />
						</div>
						<div id="name" className="col-xs-8">
							<h4>{name}</h4>
						</div>
					</div>
				</div>
			);
		}
	}

	class Tabs extends React.Component{
		render() {
		var about = parseProp(this.props.about);
		var menu = parseProp(this.props.menu);
		var tables = this.props.tables;
			return (
				<div className="container">
					<div className="row margin-top-20px">
						<div className="col-xs-12">
							<ul className="nav nav-tabs" id="myTab">
								<li className="active"><a data-toggle="tab" href="#aboutTab">About</a></li>
								<li><a data-toggle="tab" href="#menuTab">Menu</a></li>
								<li><a data-toggle="tab" href="#bookingsTab">Bookings</a></li>
							</ul>
							<div className="tab-content margin-top-10px">
								<div id="aboutTab" className="tab-pane fade in active">
									 <div>
										{about.map(function(item,index){
											return <p key={ index } >{item}</p>;
										})}
									</div>
									<button className="btn central-content" onClick={() => onBack()}>___________</button>
								</div>
								<div id="menuTab" className="tab-pane fade">
									 <div>
										{menu.map(function(item,index){
											return <p key={ index }>{item}</p>;
										})}
									</div>
									<button className="btn central-content" onClick={() => onBack()}>___________</button>
								</div>
								<div id="bookingsTab" className="tab-pane fade">
									 <input className="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
									 <div id="tables">
										<div className="column" className="tablesLayout">
											{tables.map(function(item,index){
											if(item.Status==="1"){
												return <img src="img/table.jpg" key={ index }></img>;
											}else{
												return <img src="img/table1.jpg" key={ index }></img>;
											}
										})}
										</div>
										<button className="btn central-content" onClick={() => onBack()}>___________</button>
									 </div>
								</div>
								<br />
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	var InstantBox = React.createClass({
    doSearch:function(queryText){
        console.log(queryText)
        //get query result
        var queryResult=[];
        this.props.data.forEach(function(item){
            if(item.Name.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(item);
        });

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },
    getInitialState:function(){
        return{
            query:'',
            filteredData: this.props.data
        }
    },
    render:function(){
        return (
            <div className="InstantBox central-content">
                <SearchBox query={this.state.query} doSearch={this.doSearch}/>
                <DisplayTable data={this.state.filteredData}/>
            </div>
        );
    }
});

var SearchBox = React.createClass({
    doSearch:function(){
        var query=this.refs.searchInput.value; // this is the search text
        this.props.doSearch(query);
    },
    render:function(){
        return <input className="form-control" type="text" ref="searchInput" placeholder="Search Restaurant" value={this.props.query} onChange={this.doSearch}/>
    }
});

var DisplayTable = React.createClass({
      doSearch:function(queryText){
        console.log(queryText)
        //get query result
        var queryResult=[];
        this.props.data.forEach(function(item){
            if(item.Name.toLowerCase().indexOf(queryText)!=-1)
            queryResult.push(i);
        });

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },

    render:function(){
        var rows=[];
        this.props.data.forEach(function(item,index) {
        rows.push(
						<li className="list-group-item" onClick={() => displayRestaurant(item.Id)} key={index}>
							 <h4>{item.Name}</h4>
							 <p>&#x2605;&#x2605;&#x2606;&#x2606;&#x2606;</p>
						</li>)
        });
        return(
             <ul className="list-group margin-top-20px">
                {rows}
								<button className="btn central-content" onClick={() => onBack()}>___________</button>
            </ul>

        );
    }
});
	function displayRestaurant(id){
		var data = Session.restaurants;
		data[0].CurrentRestaurant = id;
		data[0].CurrentPage = "display";
		var appState = new window.State(data, window.handler);
  	window.appState = appState;
  	render(appState);
	}

	function goToRestaurantPage(state){
		 state[0].CurrentPage = "display";
		 state[0].CurrentRestaurant = state.CurrentRestaurant;
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

	function findCurrentPage(state){
			var currentPage = state.getState()[0].CurrentPage;
			var app;
			if(currentPage === "all"){
				app=
					<div>
						<AllRestaurants restaurants={state.getState()[0].Restaurants} filtered={state.getState()[0].Filtered} state={state}/>
					</div>
				;
			}else if(currentPage=== "login"){
				app = React.createElement(LoginPage);
			}else{
				app=
					<div>
						<DisplayRestaurant state={state}/>
					</div>
				;
			}
			return app;
	}

	class DisplayRestaurant extends React.Component{
		render(){
			var currentRestaurant = findRestaurant(this.props.state.getState());
			return <div>
								<Header name={currentRestaurant.Name}  picture={currentRestaurant.Picture}/>
								<Tabs about={currentRestaurant.About} menu={currentRestaurant.Menu} tables={currentRestaurant.Tables}/>
							</div>
		}
	}

	class App extends React.Component {
		render() {
			var state = this.props.state;
			var app = findCurrentPage(state);
			return app;
		}
	}

window.render = function(state){
		ReactDOM.render(<App state={state}/>, document.getElementById("reactApp"));
	}


window.State = function(initialState, handler){
	var s = {};

	function dispatch(action){
		initialState = handler(initialState, action);
		render(this);
	}

	function getState(){
		return initialState;
	}

	s.dispatch = dispatch.bind(s);
	s.getState = getState.bind(s);

	return s;
}

window.handler = function(state, action){
	var state = currentRestaurantHandler(state, action);
	state = currentPageHandler(state,action);
	return state;
}


function currentRestaurantHandler(state, action){
	if(action.Type === "changeRestaurant"){
		return {
			...state,
			CurrentRestaurant : action.Payload
		};
	}
	return state;
}

function currentPageHandler(state, action){
	if(action.Type === "changePage"){
		return {
			...state,
			CurrentPage : action.Payload.CurrentPage
		};
	}
	return state;
}




	function onBack(){
		var appState = previousState;
		window.appState = appState;
		render(appState);
	}

	var data = [];
	data.push({CurrentPage : "login"});
  var appState = new window.State(data, window.handler);
	previousState = appState;
  window.appState = appState;
  render(appState);
