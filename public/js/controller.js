// Hydration = x is a web based calculator for sourdough bakers.
// Copyright (C) 2011  Josh Cronemeyer
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// For more information please visit the project on github: 
// https://github.com/joshuacronemeyer/Flour-and-Water

// 

function  textAsInt(selector){
  return parseInt($(selector).text());
}

function  widthAsInt(selector){
  return parseInt($(selector).width());
}

function resetCalculator(){
  hydrationCalculator = new HydrationCalculator(
     textAsInt('#flour-size'), 
     textAsInt('#water-size'), 
     textAsInt('#starter-size'), 
     textAsInt('#starter-hydration')
    );
}

calculator = function() {
  return new HydrationCalculator(
     textAsInt('#flour-size'), 
     textAsInt('#water-size'), 
     textAsInt('#starter-size'), 
     textAsInt('#starter-hydration')
    );
}

baseTwitterIframeSRC = "http://platform0.twitter.com/widgets/tweet_button.html?_=1298156795174&count=vertical&lang=en&url=http%3A%2F%2Fjoshuacronemeyer.github.com%2FFlour-and-Water&via=MakingLoaf"
function setTweetText(){
  var hydration = $("#result").text();
  var tweetText = "My sourdough is " + hydration + "% hydration exactly! I calculated it with this:";
  var encodedTweetText = "&text=" + encodeURIComponent(tweetText);
  $("iframe").attr("src", baseTwitterIframeSRC + encodedTweetText);
}

function theWaterChanged() {
  var water =  $("#water").width();
  $("#water-size").text(water);
  calculateAndSetHydrationAndWeight({"water": water});
}

function theFlourChanged() {
  var flour =  $("#flour").width();
  $("#flour-size").text(flour);
  calculateAndSetHydrationAndWeight({"flour": flour});
}

function theStarterChanged() { 
  var starter =  $("#starter").width();
  $("#starter-size").text(starter);
  theStarterHydrationChanged();
  calculateAndSetHydrationAndWeight({"starter": starter});
}

function theStarterHydrationChanged(){
  var percentHydration = parseInt(($('#hydration').width() / $('#starter').width())*100)
  $('#starter-hydration').text(percentHydration);
  calculateAndSetHydrationAndWeight({"starterHydration": percentHydration});
}

function calculateAndSetHydrationAndWeight(changes) {
  hydrationCalculator.update(changes);
  $('#result').text(hydrationCalculator.hydration());
  $("#info-result").text(hydrationCalculator.hydration());
  $('#dough-weight').text(hydrationCalculator.weight());
}

function toggleLock() {
  $('#lock').toggleClass("hydrationUnlocked");
}

function resizeableParams(updateCallback){ 
  return {
    maxHeight: 80,
	  minHeight: 80,
	  resize: updateCallback,
	  stop: setTweetText
  }
}
