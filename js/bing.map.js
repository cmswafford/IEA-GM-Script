var map = null;
var points = [];
var shapes = [];
var center = null;

function LoadMap(where) {
    map = new VEMap('theMap1');
    options = new VEMapOptions();
    options.EnableBirdseye = true;

    // Makes the control bar less obtrusize.
    map.SetDashboardSize(VEDashboardSize.Small);

    //map.onLoadMap = mapLoaded;
  
	map.LoadMap(null, null, null, null, null, null, null, options);
	FindAddressOnMap(where);
	//map.Resize(340,250);
}

function FindAddressOnMap(where) {
    var numberOfResults = 1;
    var setBestMapView = true;
    var showResults = false;

    map.Find("", where, null, null, null,
            numberOfResults, showResults, true, true,
            setBestMapView, FindCallback);
}

function clearMap() {
    map.Clear();
    points = [];
    shapes = [];
}


function FindCallback(layer, resultsArray) {
   var pin = new VEShape(VEShapeType.Pushpin, map.GetCenter());
   //Make a nice Pushpin shape with a title and description
   pin.SetTitle("<span class=\"pinTitle\"> " + escape('Seibel Center') + "</span>");
   pin.SetDescription("<p class=\"pinDetails\">"+escape('Urbana, IL') + "</p>");
   map.AddShape(pin);
}

function mapLoaded() {
	var title = "Seibel Center";
	var address = "Urbana, IL";

	map.SetZoomLevel(14);
	LoadPin(map.GetCenter(), title, address);
	
}