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

QUnit.test('#getSelectedTables', function(assert) {
  var tables = [{ "id": "1", "className":"tableSelected"},
                { "id": "2", "className":"pop-non"},
                {"id": "3", "className":"tableSelected"}
              ];
    assert.deepEqual( getSelectedTables(tables), ["1", "3"], "ok");
});

QUnit.test('#addHours', function(assert) {
  var date = new Date("2017-03-25T10:00:00");
  var result = new Date("2017-03-25T12:00:00");
  assert.deepEqual( Utils.addHours(date, 2),result, "ok");
});

QUnit.test('#formatDateTime', function(assert) {
  var date = "2017-03-10T22:02:00.000Z";
  assert.deepEqual( Utils.formatDateTime(date),"2017-03-10 22:02", "ok");
});
