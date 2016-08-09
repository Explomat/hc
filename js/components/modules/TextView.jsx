var React = require('react');

var TextView = {

	propTypes: {
		className: React.PropTypes.string,
		inputClassName: React.PropTypes.string,
		focused: React.PropTypes.bool,
		onChange: React.PropTypes.func, 
		onBlur: React.PropTypes.func,
		onClick: React.PropTypes.func,
		isValid: React.PropTypes.func,
		notValidClass: React.PropTypes.string,
		readOnly: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			value: '',
			placeholder: '',
			notValidClass: 'input-box__input--not-valid',
			isValid: function() {
				return true;
			},
			readOnly: false
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
			e.target.classList.add(this.props.notValidClass);
		}
		else {
			e.target.classList.remove(this.props.notValidClass);
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
			e.target.classList.remove(this.props.notValidClass);
			val = this.props.value;
		}

		if (this.props.onBlur)
			this.props.onBlur(val);
	},

	render: function() {
		var isValidStyle = !this.props.isValid(this.state.value) ? "borderBottom: '2px solid #ff5252;'" : '';
		var inputClassName = this.props.inputClassName ? this.props.inputClassName : '';
		return (
			<input 
				style={{isValidStyle}}
				ref="inpt" 
				type="text" 
				value={this.state.value} 
				className={inputClassName} 
				onChange={this.handleChange} 
				onBlur={this.handleBlur} 
				onClick={this.props.onClick}
				readOnly={this.props.readOnly}/>

		);
	}
}

module.exports = TextView;