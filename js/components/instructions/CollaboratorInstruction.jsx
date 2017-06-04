var React = require('react');

var CollaboratorInstruction = React.createClass({
	
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
				{/*
				<p>
					<u><i><strong>Для проведения самооценки, Вам необходимо:</strong></i></u>
				</p>
				<p>
					<i style={{"lineHeight": "20px"}}>
						1. Ознакомиться и проверить индивидуальные задачи/проекты и факт выполнения;<br />

						2. Проставить оценку по Компетенции и Отношению в графу «Оценка сотрудника» (при необходимости внести комментарии);<br />

						3. Нажать «Сохранить»;<br />

						4. Далее «Отправить на оценку руководителем».<br />

						5. По возникающим вопросам, посетите наш <a target="__blank" href="/view_doc.html?mode=forum_assessment&object_id=6384306128690555642">форум</a><br />
					</i>
				</p>*/}
			</div>
		)
	}
});

module.exports = CollaboratorInstruction;