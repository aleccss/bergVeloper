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

	class DisplayRestaurant extends React.Component{
		render(){
			var currentRestaurant = findRestaurant(this.props.state.getState());
			return <div>
								<Header name={currentRestaurant.Name}  picture={currentRestaurant.Picture}/>
								<Tabs about={currentRestaurant.About} menu={currentRestaurant.Menu} tables={currentRestaurant.Tables}/>
							</div>
		}
	}
