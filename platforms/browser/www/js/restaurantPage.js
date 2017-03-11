
var globalData;

class LoginPage extends React.Component{
	render() {
		return (
			<div>
			<div className="container">
				<div className="row">
				</div>
			<div className="row">
				<div className="col-md-12">
					<img src="img/logo.jpg"/>
				</div>
			</div>
			<div className="row" >
			</div>
		</div>
		<div className="container input-group">
			<div className="row">
				<div className="col-xs-2"></div>
				<div className="col-xs-8">
					<input id="loginUsername" className="form-control" placeholder="Username"></input>
				</div>
				<div className="col-xs-2"></div>
			</div>
			<div className="row">
				<div className="col-xs-2"></div>
				<div className="col-xs-8">
					<input id="loginPassword" className="form-control" type="password" placeholder="Password"></input>
				</div>
				<div className="col-xs-2"></div>
			</div>
			<div className="row">
				<div className="col-xs-1"></div>
				<div className="col-xs-5">
					<button type="button" className="btn" >Register</button>
					<div id="signUpPopup" className="modal">
							<div className="modal-content input-group">
								<span className="close">&times;</span>
								<p className="myClass">SignUp Information</p>
								<input type="text" className="form-control" name="user" id="username" placeholder="username"></input>
								<input type="password" className="form-control" name="password" id="password" placeholder="password" ></input>
								<input type="text" className="form-control" name="phone" id="phone" placeholder="phone" ></input>
								<button type="button" className="btn">Save</button>
							</div>
					</div>

				</div>
				<div className="col-xs-5">
					<button type="button" className="btn" onClick={() => signInClick()} >Sign In</button>
				</div>
				<div className="col-xs-1"></div>
			</div>
			<div className="row">
				<div className="col-xs-3"></div>
				<div className="col-xs-6">
					<a className="label label-default" onClick={() => notNowClick()}>Not now</a>
				</div>
				<div className="col-xs-3"></div>
			</div>
			<div className="row"></div>
		</div>
		<div className="container">
			 <div className="row">
				 <div className="col-xs-2"></div>
				 <div className="col-xs-4">
					 <img id="FbButton" src="img/icons/facebook.png" ></img>
				 </div>
				 <div className="col-xs-4">
					 <img id="GoogleButton" src="img/icons/googlePlus.png" ></img>
				 </div>
				 <div className="col-xs-2"></div>
			</div>
		</div>
		</div>
	);
}
}
function notNowClick(){
	var data = globalData;
	data[0].CurrentPage = "all";
	var appState = new State(data, handler);
	window.appState = appState;
	render(appState);
}

function signInClick() {

   console.log("click pe sign in");
}

class AllRestaurants extends React.Component{
		render() {
			var list = this.props.restaurants;
			var filtered = this.props.filtered;
			var state = this.props.state.getState();
			return (
				<div className="container">
					<div className="row">
						<div>
						 <div className="container">
							<div className="row" >
							</div>
							<div className="row h">
								<div className="col-xs-12 logo-container">
									<img className="logo" src="logo2.jpg"></img>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="search">
									<InstantBox data={list}/>
								</div>

							</div>
						</div>
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
					<div className="row">
						<div id="picture" className="col-xs-3" style={{ display : "block" }}>
							<img src={imageSrc} />
						</div>
						<h3><div id="name" className="col-xs-9">{name}</div></h3>
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
					<div className="row">
						<div className="bs-example col-xs-12">
							<ul className="nav nav-tabs" id="myTab">
								<li><a data-toggle="tab" href="#aboutTab">About</a></li>
								<li><a data-toggle="tab" href="#menuTab">Menu</a></li>
								<li><a data-toggle="tab" href="#bookingsTab">Bookings</a></li>
							</ul>
							<div className="tab-content">
								<div id="aboutTab" className="tab-pane fade in active">
									 <div>
										{about.map(function(item,index){
											return <p key={ index } >{item}</p>;
										})}
									</div>
								</div>
								<div id="menuTab" className="tab-pane fade">
									 <div>
										{menu.map(function(item,index){
											return <p key={ index }>{item}</p>;
										})}
									</div>
								</div>
								<div id="bookingsTab" className="tab-pane fade">
									 <input className="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
									 <div id="tables">
										<div className="column" className="tablesLayout">
											{tables.map(function(item,index){
											if(item.Status==="1"){
												return <img src="table.jpg" key={ index }></img>;
											}else{
												return <img src="table1.jpg" key={ index }></img>;
											}
										})}
										</div>
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
            <div className="InstantBox">
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
        return <input className="searchbar-edit" type="text" ref="searchInput" placeholder="Search Restaurant" value={this.props.query} onChange={this.doSearch}/>
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
        rows.push(<tr key={ index }  onClick={() => displayRestaurant(item.Id)}><td>
						<div className="container">
							<div className="row">
								<div className="col-xs-12 restaurant">
									<div className="col-xs-2 dot"></div>
									<div className="col-xs-4">
										<p>{item.Name}</p>
									</div>
									<div className="col-xs-4 rating">

										<p>&#x2605;&#x2605;&#x2606;&#x2606;&#x2606;</p>
									</div>
								</div>
							</div>
						</div>
				</td></tr>)
        });
        return(
             <table>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});
	function displayRestaurant(id){
		var data = globalData;
		data[0].CurrentRestaurant = id;
		data[0].CurrentPage = "display";
		var appState = new State(data, handler);
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
				app=
					<div>
						<LoginPage/>
					</div>
				;
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

	function render(state){
		ReactDOM.render(<App state={state}/>, document.getElementById("reactApp"));
	}


	function State(initialState, handler){
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


	function handler(state, action){
		var state = currentRestaurantHandler(state, action);
		state = currentPageHandler(state,action);
		return state;
	}

	Model.getRestaurants().then(function(data){
		if(globalData){

		} else{
		globalData = data;

    data[0].CurrentRestaurant = "1";
		data[0].CurrentPage = "login";
    var appState = new State(data, handler);
  	window.appState = appState;
  	render(appState);
	}
  });
