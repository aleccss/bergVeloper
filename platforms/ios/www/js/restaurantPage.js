
	class AllRestaurants extends React.Component{
		render() {
			var list = this.props.restaurants;
			var state = this.props.state.getState();
			return (
				<div className="container">
					<div className="row">
						<h3><p>All Restaurants</p></h3>
						<div>
							{list.map(function(item,index){
								return <p key={ index } >{item.Name}</p>;
							})}
						</div>
						<button onClick={goToRestaurantPage(state)} className="btn btn-lg btn-warning"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Go to restaurant page</button>
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

	function goToRestaurantPage(state){
		 state.CurrentPage = "display";
		 state.CurrentRestaurant = state.CurrentRestaurant;
	}

	function parseProp(prop){
		var results = [];
		var array = prop.split(";");
		return array;
	}

	function makeTable(table){
		var tableId = table.Id;
		return React.createElement("div",
			{style:{"border":"black 1px solid"},
		     key : tableId},
			"Table " + tableId);
	}

	function createLayoutTables(prop){
		return prop.map(makeTable);
    };

	function renderLayoutTables(data, prop){
      var item=getById(id,data);
	  return React.createElement("div",null, createLayoutTables(item[prop]));
    };
	var RestaurantTables = function(propName){

	};


	function findRestaurant(state){
		var array = state.Restaurants;
		var id = state.CurrentRestaurant;
		return array.find((item) => item.Id === id );
	}

	class App extends React.Component {
		render() {
			var state = this.props.state;
			var currentRestaurant = findRestaurant(state.getState()[0]);
			var currentPage = state.getState().CurrentPage;
			if(currentPage === "all"){
				return (
					<div>
						<AllRestaurants restaurants={state.getState()[0].Restaurants} state={state}/>
					</div>
				);
			}else{
					return (
				<div>
					<Header name={currentRestaurant.Name}  picture={currentRestaurant.Picture}/>
					<Tabs about={currentRestaurant.About} menu={currentRestaurant.Menu} tables={currentRestaurant.Tables}/>
				</div>
				);
			}
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
    data[0].CurrentRestaurant = "2";
		data[0].CurrentPage = "display";
    var appState = new State(data, handler);
  	window.appState = appState;
  	render(appState);
  });
