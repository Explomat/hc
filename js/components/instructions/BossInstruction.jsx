var React = require('react');

var BossInstruction = React.createClass({

	getDefaultProps(){
		return {
			style: {}
		}
	},

	render() {
		return (
			<div style={this.props.style}>
				<p>
					<u><i><strong>Для проведения Оценки сотрудника, вам необходимо:</strong></i></u>
				</p>
				<p>
					<i style={{"lineHeight": "20px"}}>
						1. Ознакомиться с индивидуальными показателями эффективности/задачами/проектами  и фактом их выполнения;<br />
						Примеры расчета показателей эффективности можно найти здесь:<br />
						<a target="__blank" href="/view_doc.html?mode=doc&doc_id=6424361522072535197">Расчет показателей эффективности Кредитных специалистов</a><br />
						<a target="__blank" href="/view_doc.html?mode=doc&doc_id=6424360800751142376">Расчет показателей эффективности сотрудников Контактных Центров</a><br />

						2. Ознакомиться с оценкой сотрудника по Ценностям и Компетенциям:
						<a target="__blank" href="/view_doc.html?mode=doc&doc_id=6171666812429667298">Ценности</a><br />
						<a target="__blank" href="/homecreditnew/files/assessment_kl/ОРИЕНТАЦИЯ_НА_РЕЗУЛЬТАТ.docx">Ориентация на результат</a><br />
						<a target="__blank" href="/homecreditnew/files/assessment_kl/НАВЫКИ_ВЕДЕНИЯ_ПЕРЕГОВОРОВ.docx">Навыки ведения переговоров</a><br />
						<a target="__blank" href="/homecreditnew/files/assessment_kl/ПРИМЕНЕНИЕ_ПРОФЕССИОНАЛЬНЫХ_ЗНАНИЙ_И_ТЕХНОЛОГИЙ.docx">Применение профессиональных знаний и технологий</a> <br />

						3. Назначить Оценочную встречу, нажав «Назначить встречу»;<br />

						4. Распечатать Бланк Оценки и провести Оценочную встречу;<br />

						5. После Оценочной встречи зайти в Бланк сотрудника и в графу «Оценка руководителя» внести итоговые оценки по Ценностям и Компетенциям;

						6. Нажать «Сохранить»;
						7. Далее «Завершить Оценку».
					</i>
				</p>
				{/*<p>
					<u><i><strong>Для проведения оценки сотрудника, Вам необходимо:</strong></i></u>
				</p>
				<p>
					<i style={{"lineHeight": "20px"}}>
						1. Ознакомиться с индивидуальными задачами/проектами сотрудника и фактом выполнения;<br />

						2. Ознакомиться с оценкой сотрудника по Компетенции и Отношению;<br />

						3. Назначить оценочную встречу, нажав «Назначить встречу»;<br />

						4. Распечатать бланк оценки и провести Оценочную встречу;<br />

						5. После оценочной встречи, зайти в бланк сотрудника и в графу «Оценка руководителя» внести итоговую оценку по Компетенции и Отношению;<br />

						6. Нажать «Сохранить»;<br />

						7. Далее «Завершить оценку».<br />
					</i>
				</p>*/}
			</div>
		)
	}
});

module.exports = BossInstruction;
