/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        // TO-DO - check if there is internet and load data from local
        Model.getUsers().then(function(data){
          Session.setUsers(data);
          Model.getRestaurants().then(function(data){
            Session.setRestaurants(data);
            Model.getBookings().then(function(data){
              var bookings = data;
              var restaurants = Session.restaurants[0].Restaurants;
              bookings.forEach(function(booking){
                restaurants.forEach(function(restaurant){
                  if(booking.restaurantId === restaurant.Id){
                    restaurant.Bookings.push(booking);
                  }
                });
              });
              var users = Session.users;
              bookings.forEach(function(booking){
                users.forEach(function(user){
                  if(user._id === booking.userId){
                    user.bookings.push(booking);
                  }
                });
              });
              Session.setBookings(data);
              if(window.localStorage.getItem("has_run") === null || window.localStorage.getItem("has_run") === "null"){
                Utils.showTutorialPage();
                window.localStorage.setItem("has_run", "true");
                var elem = document.getElementById('sliderSwipe');
                window.sliderSwipe = Swipe(elem, {
                   startSlide: 0,
                   auto: 3000,
                   continuous: false,
                   disableScroll: true,
                   stopPropagation: true,
                   callback: function(index, element) {},
                   //set index to last page, it should be an image with bgColor as bg
                   transitionEnd: function(index, element) {
                                        if(index > 0){
                                          document.getElementById("goLeft").className = document.getElementById("goLeft").className.replace("hidden", "");
                                        } else {
                                          document.getElementById("goLeft").className += "hidden";
                                        }
                                        if(index === 6){
                                          Utils.goToLogin();
                                        }
                   }
                });
              } else {
                if(!window.localStorage.getItem("loggedUser") || window.localStorage.getItem("loggedUser") === "null"){
                  Utils.goToLogin();
                } else {
                  Utils.goToAllPage();
                }
              }
            });
          });
        });
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
      //  var listeningElement = parentElement.querySelector('.listening');
      //  var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();
