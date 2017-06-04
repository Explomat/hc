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
					<u><i><strong>Для проведения Оценки необходимо:</strong></i></u>
				</p>
				<p>
					<i style={{"lineHeight": "20px"}}>
						1. Ознакомиться и проверить индивидуальные показатели.<br />
						<a target="__blank" href="/homecreditnew/files/assessment_kl/Индивидуальные_показатели_Кредитный_специалист.docx">Кредитный специалист,</a><br />
						<a target="__blank" href="/homecreditnew/files/assessment_kl/Индивидуальные_показатели_Контактные_Центры.docx">Сотрудники Контактных Центров</a><br />

						2. В разделе «Оценка по критериям» выбрать  соответствие  по
						<a target="__blank" href="/view_doc.html?mode=doc&doc_id=6171666812429667298">Ценностям</a>
						и Компетенциям: <a target="__blank" href="/homecreditnew/files/assessment_kl/ОРИЕНТАЦИЯ_НА_РЕЗУЛЬТАТ.docx">Ориентация на результат, </a>
						<a target="__blank" href="/homecreditnew/files/assessment_kl/НАВЫКИ_ВЕДЕНИЯ_ПЕРЕГОВОРОВ.docx">Навыки ведения переговоров, </a> 
						<a target="__blank" href="/homecreditnew/files/assessment_kl/ПРИМЕНЕНИЕ_ПРОФЕССИОНАЛЬНЫХ_ЗНАНИЙ_И_ТЕХНОЛОГИЙ.docx">Применение профессиональных знаний и технологий</a> <br />

						3. Нажать «Сохранить»<br />

						4. Далее «Отправить на оценку руководителем»<br />

						<em>5. По возникающим вопросам, посетите наш <a target="__blank" href="/view_doc.html?mode=forum_assessment&object_id=6384306128690555642">ФОРУМ</a></em><br />
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