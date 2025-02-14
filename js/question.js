const questions = [
    { q: "Когда мы познакомились?", a:["27 июля", "25 августа", "15 июня"], correct: 0 },
    { q: "Где мы познакомились?", a: ["На вечеринке ", "В Вузе", "В лагере", "В интернете"], correct: 2 },
    { q: "Как зовут нашего огонька в TikTok?", a: ["Серийчик🔥", "Булічка🩵", "Бусінка💖", "Міфка🧸"], correct: 1 },
    { q: "Как называлась песня на нашу годовщину?", a: ["Нас судьба связала","Для Насти", "Юбилей 2024", "Этот наш с тобой день","Minor", "Плюнь мне в жопу"], correct: 3 },
    { q: "Когда я в последний раз к тебе приезжал?", a:["Январь", "Февраль", "Март"], correct: 1 },
    { q: "На кого ты похожа своей мимикой бровей?", a:["Эмилия Кларк", "Марго Робби", "Райан Гослинг","Емма Стоун","Сандра Буллок"], correct: 0 },
    { q: "Хворий страждає на авітаміноз С. Лікар призначив курс фітотерапії. Яка лікарська рослинна сировина багата на цей вітамін:", a:["Cortex Quercus", "Cortex Vіburnі opulі", "Fructus Rosae","Rhіzomata Tormentіllae","Folіа Menthae pіperіtae"], correct: 2 },
    { q: "При проведенні мікроскопічного аналізу кореня алтеї необхідно визначити наявність у клітинах рослини крохмальних зерен. За допомогою якого реактиву можна це зробити?", a:["Розчином тимолу", "Розчином Люголя", "Концентрованою сульфатною кислотою","Гідроксидом амонію"], correct: 1 },
    { q: "Наш первый танец случился?", a:["На первом свидании","В Искорке", "При последней встречи","Нет правильного ответа"], correct: 1 },
    { q: "Что являеться нашим талисманом?", a:["Листик","Определенная дата", "Подвеска с голубым каменем","Нет правильного ответа"], correct: 2 },
    { q: "Как зовут символа твоей аптеки?", a:["Орешек","Подорожник","Подорожка","911"], correct: 2 },
    { q: "Кон тамцем?", a:["Ой не чує баба","Ума ума еееееее","*Музыка из Титаника*","Их виль нихт",], correct: 3 },
    { q: "Мой любимый фильм для просмотра с тобой? (Думай очень хорошо😏)", a:["Рождество на двоих","До встречи с тобой","Гордость и предубеждение","С любовью, Рози"], correct: 3 },
    { q: "Я тебя люблю🩵", a:["И я тебя люблю🩵"], correct: 0 },
];
let currentQuestion = 0;
let lastAttempt = localStorage.getItem('lastAttempt') || 0;
const cooldown = 2 * 60 * 1000;
function loadQuestion() {
    if (Date.now() - lastAttempt < cooldown) {
        showRetryTimer();
        return;
    }
    let number_question = document.getElementById("question_number");
    number_question.classList.remove("hidden");
    number_question.innerText = currentQuestion + 1 + "/" + questions.length;
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("question").innerText = questions[currentQuestion].q;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    questions[currentQuestion].a.forEach((answer, index) => {
        let btn = document.createElement("button");
        btn.className="options";
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });
}
function checkAnswer(index) {
    if(index === questions[currentQuestion].correct){
        alert("Правильно! 💖");
        currentQuestion++;
        if(currentQuestion < questions.length){
            loadQuestion();
        }else{
            document.getElementById("quiz-container").classList.add("hidden");
            document.getElementById("result").innerText = "Поздравляю моя хорошая, ты прошла викторину!🩵🩵🩵";
            document.getElementById("result").classList.remove("hidden");
            setTimeout(() => {
                window.location.href = "gift_page.html";
            }, 5000);
        }
    }else{
        alert("Неправильно! Попробуй еще раз! 💔")
        lastAttempt = Date.now();
        localStorage.setItem('lastAttempt', lastAttempt);
        showRetryTimer();
    }
}
function showRetryTimer() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("retry-timer").classList.remove("hidden");
    updateRetryTimer();
}
function updateRetryTimer() {
    let remaining = cooldown - (Date.now() - lastAttempt);
    if(remaining <= 0){
        document.getElementById("retry-timer").classList.add("hidden");
        loadQuestion();
    }else{
        let minutes = Math.floor(remaining / 60000);
        let seconds = Math.floor((remaining % 60000) / 1000);
        document.getElementById("retry-timer").innerText = `Попробуй снова через время ${minutes} : ${seconds} 💔`;
        setTimeout(updateRetryTimer, 1000);
    }
}
window.onload = loadQuestion;