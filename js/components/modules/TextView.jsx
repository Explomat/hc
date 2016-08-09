var React = require('react');
var assign = require('lodash/assign');

var TextView = React.createClass({

	propTypes: {
		style: React.PropTypes.object,
		disabled: React.PropTypes.bool,
		focused: React.PropTypes.bool,
		onChange: React.PropTypes.func, 
		onBlur: React.PropTypes.func,
		onClick: React.PropTypes.func,
		isValid: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			value: '',
			style: {},
			notValidStyle: {
				border: '2px solid #ff5252'
			},
			isValid: function() {
				return true;
			},
			disabled: false
		}
	},

	getInitialState: function() {
		return {
			value: this.props.value
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({value: nextProps.value});
	},

	componentDidMount: function(){
		if (this.props.focused){
			var inpt = this.refs.inpt;
			inpt.selectionStart = inpt.selectionEnd = inpt.value.length;
			inpt.focus();
		}
	},

	handleChange: function(e) {
		if (!this.props.isValid(e.target.value)) {
			e.target.style = 'border: 2px solid #ff5252; width: 50px; outline: none;';
		}
		else {
			e.target.style = 'width: 50px; outline: none;';
		}
		var val = e.target.value;
		this.setState({value: e.target.value});
		if (this.props.onChange && this.props.isValid(val)) {
			this.props.onChange(val);
		}
	},

	handleBlur: function(e){
		var val = e.target.value;
		if (!this.props.isValid(e.target.value)) {
			this.setState({value: this.props.value});
			e.target.style = 'width: 50px; outline: none;';
			val = this.props.value;
		}

		if (this.props.onBlur)
			this.props.onBlur(val);
	},

	render: function() {
		var styles = !this.props.isValid(this.state.value) ? assign(this.props.style, this.props.notValidStyle) : this.props.style;
		return (
			<input 
				style={styles}
				ref="inpt" 
				type="text" 
				value={this.state.value} 
				onChange={this.handleChange} 
				onBlur={this.handleBlur} 
				onClick={this.props.onClick}
				disabled={this.props.disabled}/>

		);
	}
});

module.exports = TextView;