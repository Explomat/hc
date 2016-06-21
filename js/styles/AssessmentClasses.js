var AssessmentClasses = {
	assessmentContainer: {
		percentAverage: {
			display: 'none',

			displayAverage: {
				display:  'block'
			}
		},
		blockContainer: {
			marginTop: '24px',
    		marginBottom: '24px',

    		block: {
				border: '1px solid #000',
				borderCollapse: 'collapse',
				width: '100%',

				title: {
					padding: '16px',
					backgroundColor: '#dbdbdb',
					marginBottom: '8px'
				},

				th: {
					border: '1px solid #000',
					padding: '5px',
					whiteSpace: 'nowrap'
				},

				description: {
					padding: '5px',
					color: 'red',
					whiteSpace: 'nowrap'
				},

				task: {
					
					td: {
						border: '1px solid #000',
						padding: '5px',

						input: {
							width: '50px'
						},
						tdButton: {
							width: '100%',

							button: {
								'float': 'right'
							}
						}
					},

					fact: {
						backgroundColor: '#f1b9b2'
					}
				}
			}
		}
	}
}

module.exports = AssessmentClasses;