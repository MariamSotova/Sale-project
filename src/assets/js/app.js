function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);

  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 4 * 24 * 60 * 60 * 1000); // for endless timer
initializeClock("countdown", deadline);

// Указываем дату окончания работы таймера:
// Формат вывода даты ISO 8601:
// var deadline = '2015-12-31';

// Сокращенный формат:
// var deadline = '31/12/2015';

// Длинный формат:
// var deadline = 'December 31 2015';

// Вывод даты с точным временем и часовым поясом. По такому примеру таймер будет отсчитывать время до 20 мая:
// var deadline="May 20 2018 00:00:00 GMT+0300";

// Вывод таймера для лендингов – таймер все время будет выводить, что осталось 15 дней (можно указать любое время)
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

// Credit: Mateusz Rybczonec

// below is the code for the drop-down menu

const questions = document.getElementsByClassName("question");
for (let i = 0; i < questions.length; i++) {
  const question = questions[i];
  question.addEventListener("click", function () {
    this.classList.toggle("active");
    const answer = this.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
}

// Below is the animation code for gifts appearing when scrolling
const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        animItem.classList.remove("_active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollleft = window.pageXOffset || document.documentElement.scrollleft,
      scrolltop = window.pageYOffset || document.documentElement.scrolltop;
    return { top: rect.top + scrolltop, left: rect.left + scrollleft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}
