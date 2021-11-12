import getRefs from '../data/references';

const refs = getRefs();

function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}

function scrollTop() {
  let btn = refs.toTopBtn;
  window.addEventListener('scroll', function () {
    if (pageYOffset > 100) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.onclick = function (click) {
    click.preventDefault();
    scrollTo(0, 400);
  };
}

export { scrollTo, scrollTop };
