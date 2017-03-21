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
