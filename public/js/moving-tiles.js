var positions = [];
var currentSelectedPosition = 6;

function Tile (id) {
  this.id = id;
  this.selected = false;
  this.$tile;
}

Tile.prototype.setSelected = function(selected) {
  this.selected = selected;
}
Tile.prototype.isSelected = function() {
  return this.selected;
}
Tile.prototype.setTile = function($el) {
  this.$tile = $el;
}
Tile.prototype.getTile = function( ){
  return this.$tile;
}

function init() {
  $(".tile").each(function(i){
    var tile = new Tile(i);
    $(this).data("index", i);
    if (i == currentSelectedPosition) {
      tile.setSelected(true);
    }
    tile.setTile($(this));
    positions.push(tile);
  });
  render();
}

init();

function render() {
  var x = 0;
  var y = 0;
  for(var i = 0; i<positions.length; i++) {
    positions[i].getTile().css("top", y * 50 + "%");
    positions[i].getTile().css("left", x * 15 + "%");

    if (y == 0){
      y = 1;
    } else {
      y = 0;
      x++;
    }
    if (positions[i].isSelected()) {
      positions[i].getTile().addClass("select");
      y = 0;
      x += 2;
    } else {
      positions[i].getTile().removeClass("select");
    }
   }
}

function reorder(id) {
  var selectedTilePosition = 0;
  var selectedTile;
  var newPosition = 0;
  positions.forEach(function(tile, i){
    if (tile.id == id) {
      // found the tile we are hovering
      tile.setSelected(true);
      selectedTilePosition = i;
    } else {
      // set the tiles to not selected
      tile.setSelected(false);
    }
  });
  selectedTile = positions.splice(selectedTilePosition, 1)[0];

  if (selectedTilePosition > currentSelectedPosition) {
    // selecting from right of already selected tile
    if (selectedTilePosition % 2 == 1){
      // if odd
      newPosition = selectedTilePosition + 1;
    } else {
      // if even
      newPosition = selectedTilePosition;
    }
  } else {
    // selecting left of already selected tile
    if (selectedTilePosition % 2 == 1){
      newPosition = selectedTilePosition - 1;
    } else {
      newPosition = selectedTilePosition;
    }
  }

  positions.splice(newPosition, 0, selectedTile);
  currentSelectedPosition = newPosition;
}

$(".tile").on("mouseover", function(){
  reorder($(this).data("index"));
  render();
});