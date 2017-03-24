module ("Tests",{});

QUnit.test('#parseProp', function(assert) {
    assert.deepEqual( parseProp("ab;b"), ["ab","b"], "ok");
});

QUnit.test('#updatedTables', function(assert){
  var bookings = [{
	               "id": "3",
	               "dateTime": "2017-03-10T22:02:00.000Z",
	               "restaurantId": "1",
	               "tableIds": ["1","3"]
               }];
  var result = [{Id:"1",Status:"2",dateTime:"2017-03-10T22:02:00.000Z"},
                {Id:"3",Status:"2",dateTime:"2017-03-10T22:02:00.000Z"}];
  assert.deepEqual(getAllBookedTables(bookings),result);
});
