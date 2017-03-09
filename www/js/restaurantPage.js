
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

	class LoginPage extends React.Component{
		render() {
			return (
		<div class="container">
        <div class="row" style="height: 60px;">
        </div>
        <div class="row">
          <div class="col-md-12">
            <img src="img/logo.jpg" style="width: 120px; height: 120px; margin-left: auto; margin-right: auto; display: block;"/>
          </div>
        </div>
        <div class="row" style="height: 40px;">
        </div>
      </div>
      <div class="container input-group">
        <div class="row">
          <div class="col-xs-2"></div>
          <div class="col-xs-8" style="margin: 5px;">
            <input id="loginUsername" class="form-control" placeholder="Username" style="position: initial;"></input>
          </div>
          <div class="col-xs-2"></div>
        </div>
        <div class="row">
          <div class="col-xs-2"></div>
          <div class="col-xs-8" style="margin: 5px;">
            <input id="loginPassword" class="form-control" type="password" placeholder="Password" style="position: initial;"></input>
          </div>
          <div class="col-xs-2"></div>
        </div>
        <div class="row" style="margin-top: 10px;">
          <div class="col-xs-1"></div>
          <div class="col-xs-5">
            <button type="button" class="btn" onclick="signUpButtonClicked" style="background-color: black; color: white; width:100px; margin: 5px; margin-left: auto; margin-right: auto; display: block;">Register</button>
            <div id="signUpPopup" class="modal">
                <div class="modal-content input-group">
                  <span class="close" onclick="spanClick">&times;</span>
                  <p class="myClass">SignUp Information</p>                  
                  <input type="text" class="form-control" name="user" id="username" placeholder="username" style="margin: 5px;">                  
                  <input type="password" class="form-control" name="password" id="password" placeholder="password" style="margin: 5px;">                  
                  <input type="text" class="form-control" name="phone" id="phone" placeholder="phone" style="margin: 5px;">
                  <button type="button" class="btn" onclick="saveUser" style="margin: 5px; width:100%">Save</button>
                </div>
            </div>

          </div>
          <div class="col-xs-5">
            <button type="button" class="btn" onclick="signInClick" style="background-color: black; color: white; width:100px; margin: 5px; margin-left: auto; margin-right: auto; display: block;">Sign In</button>
          </div>
          <div class="col-xs-1"></div>
        </div>
        <div class="row">
          <div class="col-xs-3"></div>
          <div class="col-xs-6">
            <a href="restaurantPage.html" class="label label-default" style="display: block; margin-top: 10px;">Not now</a>
          </div>
          <div class="col-xs-3"></div>
        </div>
        <div class="row" style="height: 40px" ></div>
      </div>
      <div class="container">
         <div class="row">
           <div class="col-xs-2"></div>
           <div class="col-xs-4">
             <img id="FbButton" src="img/icons/facebook.png" style="width:70px; margin-left: auto; margin-right: auto; display: block;"></img>
           </div>
           <div class="col-xs-4">
             <img id="GoogleButton" src="img/icons/googlePlus.png" style="width:70px; margin-left: auto; margin-right: auto; display: block;"></img>
           </div>
           <div class="col-xs-2"></div>
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
			if(currentPage === 'login'){
				return (<div>
					<LoginPage/>
					</div>
				);				
			} else if(currentPage === "all"){
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
	
	var data = [];
	data.push({CurrentPage : 'login'});
    var appState = new State(data, handler);
  	 window.appState = appState;
  	 render(appState);
 
