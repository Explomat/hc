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
					marginBottom: '8px',
					fontSize: '12px',
    				fontWeight: 'bold'
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
							width: '50px',
							outline: 'none'
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
					},
					textarea: {
						resize:'none',
						width: '120px'
					}
				},
				testInfo: {
					padding: '10px 0 10px 0',

					description: {
						display: 'none',

						displayDescription: {
							display: 'inline-block',
							borderCollapse: 'collapse'
						}
					},
					error: {
						display: 'none',

						displayError: {
							display: 'inline-block'
						}
					},
					showMonths: {
						float: 'right',
						color: '#077fcc',
						cursor: 'pointer'
					}
				},
				monthsData: {
					display: 'none',

					displayMonthsData: {
						display: 'block',
						backgroundColor: '#faf1ea',
    					padding: '10px 20px 10px 20px'
					}
				},
				tasksResult: {
					paddingTop: '10px',
					display: 'inline-block',

					rating: {
						marginLeft: '20px',

						description: {
							fontWeight: 'bold'
						},

						value: {
							textDecoration: 'underline'
						}
					},
					position: {

						description: {
							fontWeight: 'bold'
						},

						value: {
							textDecoration: 'underline'
						}
					}
				}
    		},
    		descriptionTable: {
    			display: 'inline-block'
    		}
		}
	}
}

module.exports = AssessmentClasses;