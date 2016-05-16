var Tile = function($el, id) {
  this.id = id;
  this.selected = false;
  this.$tile = $el;
}

Tile.prototype.setSelected = function(selected) {
  this.selected = selected;
}
Tile.prototype.isSelected = function() {
  return this.selected;
}
Tile.prototype.getTile = function(){
  return this.$tile;
}


var MovingTiles = function(el) {
  this.el = el;
  this.$el = $(el);
  this.tileWidth = 0;
  this.positions = [];
  this.currentSelectedPosition = 6;

  this.init();
}

MovingTiles.prototype.init = function() {
  var self = this;
  this.$el.find(".tile").each(function(i, element){
    var tile = new Tile($(element), i);
    $(this).data("index", i);
    if (i == self.currentSelectedPosition) {
      tile.setSelected(true);
    }
    self.positions.push(tile);
  });
  this.tileWidth = 100/Math.ceil(this.positions.length/2 + 1);
  this.render();
  this.bind();
}

MovingTiles.prototype.render = function() {
  var x = 0;
  var y = 0;
  for(var i = 0; i<this.positions.length; i++) {

    var styles = {
      width: this.tileWidth + "%",
      top: y * 50 + "%",
      left: x * this.tileWidth + "%"
    }

    if (y == 0){
      y = 1;
    } else {
      y = 0;
      x++;
    }
    if (this.positions[i].isSelected()) {
      styles.width = 2*this.tileWidth + "%";
      this.positions[i].getTile().addClass("select");
      y = 0;
      x += 2;
    } else {
      this.positions[i].getTile().removeClass("select");
    }

    this.positions[i].getTile().css(styles);
   }
}

MovingTiles.prototype.reorder = function(id) {
  var selectedTilePosition = 0;
  var selectedTile;
  var newPosition = 0;
  this.positions.forEach(function(tile, i){
    if (tile.id == id) {
      // found the tile we are hovering
      tile.setSelected(true);
      selectedTilePosition = i;
    } else {
      // set the tiles to not selected
      tile.setSelected(false);
    }
  });
  selectedTile = this.positions.splice(selectedTilePosition, 1)[0];

  if (selectedTilePosition > this.currentSelectedPosition) {
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

  this.positions.splice(newPosition, 0, selectedTile);
  this.currentSelectedPosition = newPosition;
}

MovingTiles.prototype.bind = function(){
  var self = this
  $(this.el + " .tile").on("mouseover", function(){
    self.reorder($(this).data("index"));
    self.render();
  });
}

var container1 = new MovingTiles(".moving-tiles1");
var container2 = new MovingTiles(".moving-tiles2");
