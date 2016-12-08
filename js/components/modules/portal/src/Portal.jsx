var React = require('react');
var ReactDOM = require('react-dom');

var Portal = React.createClass({

  propTypes: {
    node: React.PropTypes.any,
    nodeId: React.PropTypes.string,
    nodeClass: React.PropTypes.string,
    className: React.PropTypes.string
  },

  _renderToNode: function(){
    var newObj = { children: this.props.children, className: this.props.className }
    ReactDOM.render(
      <div
        {...newObj}
        />,
      this.node
    );
  },
  
  componentDidMount: function(){
    var {node, nodeId, nodeClass} = this.props;
    var nodeById = document.getElementById(nodeId);
    var nodeByClass = document.getElementsByClassName(nodeClass)[0];

    var newNode = node ? node : nodeId ? nodeById : nodeClass ? nodeByClass : null;
    if (newNode){
      this.node = newNode;
    }
    else {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }
    this._renderToNode();
  },
  
  render: function() {
    return <div />;
  },
  
  componentDidUpdate: function() {
    this._renderToNode();
  },
  
  componentWillUnmout: function() {
    document.body.removeChild(this.node);
  }
});

module.exports = Portal;