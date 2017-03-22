module ("Tests",{});

QUnit.test('#parseProp', function(assert) {
    assert.deepEqual( parseProp("ab;b"), ["ab","b"], "ok");
});

QUnit.test('#findRestaurant', function(assert) {
  var state = [{ "CurrentRestaurant" : "1",
                   "Restaurants":
                      [{ "Id":"1",
                          "Name": "David Burke Kitchen"
                       },
                       {
                          "Id":"2",
                          "Name": "Restaurant2"
                        }]
                  }];
                  debugger;
    assert.deepEqual( findRestaurant(state), { "Id":"1","Name": "David Burke Kitchen" });
});

QUnit.test('#updatedTables', function(assert){
  var bookings = {
	               "id": "3",
	               "dateTime": "2017-03-10T22:02:00.000Z",
	               "restaurantId": "1",
	               "tableIds": [
                   {
                     "0": "1"
	                 },
                   {
		                 "1": "3"
	                 }
                 ]
               };

    var currentRestaurant = {"Id": "1",
                              "Tables": [
                                {
                                "Id": "1",
                                "Status": "1"
                              },
                              {
                                "Id":"2",
                                "Status":"empty"
                              },
                              {
                                "Id":"3",
                                "Status":"2"
                              }]};
    var date = "2017-03-22T";
    var time ="12:07";
});
