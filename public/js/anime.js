/** @jsx React.DOM */

var AnimeList = React.createClass({
  render: function() {
    var animeItems = this.props.data.map(function(anime){
      return (
        <Anime title={anime.name} description={anime.description} />
      );
    });
    return (
      <div>
        {animeItems}
      </div>
    );
  }
});

var Anime = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.description}</div>
      </div>
    );
  }
});

React.render(<AnimeList data={window.anime.currentlyWatching} />, document.getElementById("now-watching"));

React.render(<AnimeList data={window.anime.recommendations} />, document.getElementById("recommended"));