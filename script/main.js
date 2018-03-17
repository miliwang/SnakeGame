
define(["food","snake","game"],function(Food,Snake,Game){
	var map = document.getElementById("map");

        var game = new Game({
            "map": map,
            "snake": new Snake({ "map": map }),
            "food": new Food({ "map": map, "bgColor": "#333" }),
        });

        game.start();
});