var React = require('react');

var CollaboratorInstruction = React.createClass({

	render() {
		return (
			<div>
				<p>
					<u><i><strong>Для проведения самооценки, Вам необходимо:</strong></i></u>
				</p>
				<p>
					<i style={{"lineHeight": "20px"}}>
						1. Ознакомиться и проверить индивидуальные задачи/проекты и факт выполнения;<br />

						2. Проставить оценку по Компетенции и Отношению в графу «Оценка сотрудника» (при необходимости внести комментарии);<br />

						3. Нажать «Сохранить»;<br />

						4. Далее «Отправить на оценку руководителем».<br />

						5. По возникающим вопросам, необходимо обращаться на адрес <a target="__blank" href="http://otsenka@homecredit.ru">otsenka@homecredit.ru</a><br />
					</i>
				</p>
			</div> 
		)
	}
});

module.exports = CollaboratorInstruction;