let dataCenter = (function(){
    let data = {
        questions: [],
        score: {
            team1: 0,
            team2: 0,
        },
        players: {
            team1: true,
            team2: false,
        },
        userNames: {
            team1: '',
            team2: '',
        }
    }  

    class Question {
        constructor(img, question, answers, rigthAnswer){
            this.img = img;
            this.question = question;
            this.answers = answers;
            this.rigthAnswer = rigthAnswer;
            this.isAttemptFirst = true;
        }
    }

    function saveQuestion(img, question, answers, rigthAnswer){ 
        data.questions.push(new Question(img, question, answers, rigthAnswer));
    }

    return{
        defineQuestions: function(){
            saveQuestion('q11.jpg', 'Что находится на фотографии?', ["Дом-музей Бальзака в Париже", "Лувр", "Музей Оранжери"], 1);
            saveQuestion('q1.jpg', 'О чем идёт речь?', ["О пизанской башне", "О Храме на крови", "О Софийском соборе"], 0);
            saveQuestion('q2.jpg', 'Что построил Людовик 14?', ["Эйфелеву башню", "Версальский дворец", "Собор Парижской богоматери"], 1);
            saveQuestion('q3.jpg', 'Какой монастырь был построен Герцогом Фридрихом?', ["Августинская церковь", "Кентерберийский собор", "Берлинский кафедральный собор"], 0);
            saveQuestion('q4.jpg', 'О каком памятнике идёт речь', ["Моаи(головы на острове пасхи)", "Валера смирился", " Писающий мальчик"], 2);
            saveQuestion('q5.jpg', 'Как называется и кому посвящен данный памятник? ', ["Памятник Иоанну 4 в Амстердаме", "Памятник Александру 1 в Роттердаме", "Памятник Пётру 1 в Заандаме"], 2);
            saveQuestion('q6.jpg', 'Кому посвящён бюст в Баден-Баден?', ["Пушкину", "Маяковскому", "Тургеневу"], 2);
            saveQuestion('q7.jpg', 'Кому посвящён этот памятник?', ["Наполеону", "Кутузову", "Багратиону"], 0);
            saveQuestion('q8.jpg', 'О каком сооружении идёт речь?', ["Амфитеатр Аммана", "Колизей", "Древняя арена Вероны"], 1);
            saveQuestion('q9.jpg', 'Кому посвящена данная статуя?', ["Афродите", "Аресу", "Зевсу"], 2);
            saveQuestion('q10.jpg', 'Как называется это строение?', ["Дворец дождей", "Тадж махал", "Монастырь нораванк"], 1);
            saveQuestion('q12.jpg', 'Что это за крепость?', ["Форт Боярд", "Замок Иф", "Замок Амбуаз"], 0);
            saveQuestion('q13.jpg', 'Как называется эта крепость?', ["Кревская крепость", "Храм-крепость Святого Михаила", "Брестская крепость"], 2);
            saveQuestion('q14.jpg', 'Что изображено на фотографии?', ["Кёльнский собор", "Храм Святого Семейства", "Крайслер Билдинг"], 0);
            saveQuestion('q15.jpg', 'Назовите сооружение', ["Харбор-Бридж", "Тауэрский мост", "Бруклинский мост"], 1);


            


        },
        getData: function(){
            return data;
        },
        sendAnswer: function(answer, number, isAttemptFirst){
            console.log(`Answer is ${answer}, currect answer is ${data.questions[number].rigthAnswer}`)
            isAnswerRight = false;
            let isAttemptFirstData = data.questions[number].isAttemptFirst;


            //Определяем, что ответить на запрос (если ответ правильный, то отправляем true, однако только если ответ правильный и попытка первая, засчитываем очко)
            if(answer === data.questions[number].rigthAnswer){
                isAnswerRight = true;
                if(isAttemptFirstData){
                    data.players.team1 ? data.score.team1++ : data.score.team2++; 
                }   
            } 

            //Определяем, когда менять игрока (если ответ правильный и попытка первая ИЛИ если ответ правильный, но попытка не первая)
            if(((answer === data.questions[number].rigthAnswer) && isAttemptFirstData) || ((answer === data.questions[number].rigthAnswer) && !isAttemptFirstData)){
                if(data.players.team1){
                    data.players.team1 = false;
                    data.players.team2 = true;
                } else { 
                    data.players.team2 = false; 
                    data.players.team1 = true;
                }
            }
            //Если ответ на вопрос неправильный, ставим флаг первой попытки: false
            if(!isAnswerRight){
                data.questions[number].isAttemptFirst = false;
            }
            return isAnswerRight;
        },
        defineWinner: function(){
            //Возвращает имя команды или false
            if(data.score.team1 > data.score.team2){
                return data.userNames.team1;
            } else if (data.score.team1 < data.score.team2) {
                return data.userNames.team2;
            } else {
                return false;
            }
        },

        setNames: function(name1, name2){
            data.userNames.team1 = name1;
            data.userNames.team2 = name2;
        }
    }
})()


let UIcenter = (function(){
    let DOM = {
        window: sel('.gameWindow'),
        img: sel('.gameWindow__img img'),
        question: sel('.gameWindow__question p'),
        answer1: sel('#ans-0'),
        answer2: sel('#ans-1'),
        answer3: sel('#ans-2'),
        score1: sel('.score-1'),
        score2:sel('.score-2'),
        getNames:sel('.start-game'),
        firstName: sel('#first-name'), 
        secondName: sel('#second-name'),
        gameWindow: sel('.gameWindow__game'),
        regWindow: sel('.gameWindow__reg'),
        name1: sel('.team-1 p'), 
        name2: sel('.team-2 p'),
    }
    return{
        updateImg: function(img){
            DOM.img.src = "src/img/" + img;
        }, 
        updateQuestion: function(question){
            DOM.question.textContent = question;
        },

        updateAnswers: function(answers){
            DOM.answer1.textContent = answers[0];
            DOM.answer2.textContent = answers[1];
            DOM.answer3.textContent = answers[2];
        },
        updateScore: function(score1, score2){
            DOM.score1.textContent = score1;
            DOM.score2.textContent = score2;
        },
        updateUserNames: function(name1, name2){
            DOM.name1.textContent = name1;
            DOM.name2.textContent = name2;
        },

        setMistakeTheme: function(rigthAnswer){
            DOM.window.classList.add('wrong');
            sel('#ans-' + rigthAnswer).classList.add('rightAnswer');
        },

        removeMistakeTheme: function(rigthAnswer){
            DOM.window.classList.remove('wrong');
            sel('#ans-' + rigthAnswer).classList.remove('rightAnswer');
        },

        setEndOfGameTheme: function(score1, score2, name1, name2, winner){
            html = `
                <div class="gameWindow__wrap">
                    <div class="endOfGame__title">Конец игры!</div>
                    <div class="gameWindow__score">
                        <div class="team-1 team-1_endOfGame">${name1}: <br> <span class="score-1">${score1}</span></div>
                        <div class="team-2 team-2_endOfGame">${name2}: <br> <span class="score-2">${score2}</span></div>
                    </div>
            `
            if(winner){
                html += `<div class="winner">
                    Победитель: <span>${winner}</span>
                    </div>
                </div>`
            } else {
                html += `<div class="winner">
                        Ничья!
                    </div>
                </div>`
            }
            DOM.window.innerHTML = html;
        },

        showRightAnswer: function(rigthAnswer){
            sel('#ans-' + rigthAnswer).classList.add('rightAnswer');
        }, 
        stopShowRightAnswer: function(rigthAnswer){
            sel('#ans-' + rigthAnswer).classList.remove('rightAnswer');
        },

        openImg: function(){
            DOM.img.classList.add('open');
        }, 
        closeImg:function(){
            DOM.img.classList.remove('open');
        },

        setGameWindow: function(){
            DOM.regWindow.classList.add('hide');
            DOM.gameWindow.classList.remove('hide');
        },

        clearFields: function(){
            DOM.firstName.value = '';
            DOM.secondName.value = '';
        },

        showCurrentPlayer: function(player1, player2){
            if(player1){
                DOM.name2.classList.remove('active');
                DOM.name1.classList.add('active');
            } else {
                DOM.name1.classList.remove('active');
                DOM.name2.classList.add('active');
            }
        },

        getDOM: function(){
            return DOM;
        }
    }
})()

let conrolCenter = (function(){
    dataCenter.defineQuestions();
    let data = dataCenter.getData();
    let questionsLength = data.questions.length;
    let count = 0;
    let openedImg = false; 

  
    let DOM = UIcenter.getDOM();
 

    function setEventListeners(){
        DOM.answer1.addEventListener('click', ()=> {
            clickHandler(DOM.answer1)
        })
        DOM.answer2.addEventListener('click', ()=> {
            clickHandler(DOM.answer2)
        })
        DOM.answer3.addEventListener('click', ()=> {
            clickHandler(DOM.answer3)
        })
        DOM.getNames.addEventListener('click', ()=>{
            startGame();
        })

        DOM.img.addEventListener('click', ()=>{
            if(!openedImg){
                UIcenter.openImg();
                openedImg = true;
            } else {
                UIcenter.closeImg();
                openedImg = false;
            }
        })
    }

    function startGame(){
        let names = [];
        names.push(DOM.firstName.value, DOM.secondName.value);
        UIcenter.clearFields();
        names.forEach((el, index)=>{
            if(el === ''){
                el = `Команда ${index + 1}`;
                names[index] = el;
            } 
        })
        dataCenter.setNames(names[0], names[1]);
        UIcenter.updateUserNames(names[0], names[1]);
        UIcenter.setGameWindow(); 
    }

    function updateUI(){
        UIcenter.updateImg(data.questions[count].img);
        UIcenter.updateQuestion(data.questions[count].question);
        UIcenter.updateAnswers(data.questions[count].answers);
        UIcenter.updateScore(data.score.team1, data.score.team2);
        UIcenter.showCurrentPlayer(data.players.team1, data.players.team2);  
    }

    function clickHandler(el){
        let answer = el.id.split('-')[1];
        let isAttemptFirst = true;

        if(count < questionsLength){
            let isAnsweRight = dataCenter.sendAnswer(parseInt(answer), count, isAttemptFirst);
            console.log(isAnsweRight);
            if(isAnsweRight) {
                if(count < questionsLength - 1){
                    UIcenter.showRightAnswer(data.questions[count].rigthAnswer);
                    setTimeout(()=> {
                        count++;
                        UIcenter.stopShowRightAnswer(data.questions[count-1].rigthAnswer);
                        UIcenter.removeMistakeTheme(data.questions[count-1].rigthAnswer);
                        updateUI();  
                    }, 1300)
                    
                } else {
                    count++;
                    UIcenter.updateScore(data.score.team1, data.score.team2);
                    let resulOfGame = dataCenter.defineWinner();
                    setTimeout(()=>{
                        UIcenter.updateScore(data.score.team1, data.score.team2);
                        UIcenter.removeMistakeTheme(data.questions[count-1].rigthAnswer);
                        UIcenter.showRightAnswer(data.questions[count-1].rigthAnswer);
                        UIcenter.setEndOfGameTheme(data.score.team1, data.score.team2, data.userNames.team1, data.userNames.team2, resulOfGame);
                    }, 1300)
                }
            } else {
                UIcenter.setMistakeTheme(data.questions[count].rigthAnswer);
                isAttemptFirst = false;
            }
        }    
    }

    return{
        init: function(){
            updateUI();
            setEventListeners();
        }
    }
})(dataCenter, UIcenter)

conrolCenter.init();
 
//--------------------
