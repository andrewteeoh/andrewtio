/** @jsx React.DOM */
var tags = ['must-watch', 'action'];

var AnimeSort = React.createClass({
  updateAnime: function(tags) {
    var activeTags = tags;
    var newAnime = this.state.anime;
    // if there are no active tags
    if (activeTags.length == 0) {
      // show all
      _.map(newAnime, function(series){
        series.isHidden = false;
      });
      return newAnime;
    }

    // iterate over each anime
    _.map(newAnime, function(series) {
      // let's assume the anime will not show
      var isHidden = true;
      // iterate over each anime's tags
      series.tags.forEach(function(tag){
        // if the tag is in our active tags, show the series
        if(_.indexOf(activeTags, tag) >= 0) {
          isHidden = false;
        }
      });
      series.isHidden = isHidden;
    });

    return newAnime;
  },
  filterByTag: function(tag) {
    var activeTags = this.state.activeTags;
    var newAnime = [];
    if (_.indexOf(activeTags, tag) >= 0) {
      // remove it
      activeTags = _.remove(activeTags, tag);
    } else {
      // add it
      activeTags.push(tag);
    }
    newAnime = this.updateAnime(activeTags);
    this.setState({
      activeTags: activeTags,
      anime: newAnime
    });
    console.log("Filtering: " + tag);
    console.log(this.state);
  },
  getInitialState: function() {
    return {
      activeTags:[],
      anime:[]
    };
  },
  componentWillMount: function() {
    var initialAnime = this.props.anime;
    _.map(initialAnime, function(anime){
      anime.isHidden = false;
    });
    this.setState({
      activeTags: [],
      anime: initialAnime
    });
  },
  render: function() {
    return (
      <div>
        <TagFilters data={this.props.tags} tagHandler={this.filterByTag}/>
        <AnimeList data={this.state.anime} />
      </div>
    );
  }
});

// TagFilters Block
var TagFilters = React.createClass({
  render: function() {
    var handler = this.props.tagHandler;
    var tags = this.props.data.map(function(tag, i) {
      return (
        <TagButton key={i} data={tag} onUserCheck={handler}/>
      )
    });
    return (
      <ul>
        {tags}
      </ul>
    );
  }
});

var TagButton = React.createClass({
  checkTag: function() {
      this.props.onUserCheck(this.refs[this.props.data].getDOMNode().value);
  },
  render: function() {
    return <span>{this.props.data}<input type="checkbox" name={this.props.data} value={this.props.data} onChange={this.checkTag} ref={this.props.data} /></span>
  }
});

// AnimeList Block
var AnimeList = React.createClass({
  render: function() {
    var animeItems = this.props.data.map(function(anime){
      return (<Anime anime={anime} />);
    });
    return (
      <div className="anime-list">
        {animeItems}
      </div>
    );
  }
});

var Anime = React.createClass({
  render: function() {
    var classString = "anime";
    var imageUrl = '/images/';
    if (this.props.anime.isHidden) {
      var classString = classString + " hidden";
    }
    imageUrl = imageUrl + this.props.anime.slug + '.jpg';
    style = {
      backgroundImage: "url('" + imageUrl + "');"
    };
    return (
      <div className={classString}>
        <div className="anime__image" style={style}>
          <div className="anime__name">{this.props.anime.name}</div>
        </div>
        <div className="anime__description">{this.props.anime.description}</div>
        <AnimeTags tags={this.props.anime.tags} />
      </div>
    );
  }
});

var AnimeTags = React.createClass({
  render: function() {
    var handler = this.props.tagHandler;
    var tags = this.props.tags.map(function(tag){
      return (
          <AnimeTag data={tag} />
      );
    });
    return (
      <div className="tag-list">
        {tags}
      </div>
    );
  }
});

var AnimeTag = React.createClass({
  render: function() {
    return (<span className="tag">{this.props.data}</span>);
  }
});

// React.render(<AnimeList data={window.anime.currentlyWatching} />, document.getElementById("now-watching"));

React.render(<AnimeSort anime={window.anime} tags={tags} />, document.getElementById("recommended"));