// Nav toggle (mobile)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Count-up numbers + donut arc reveal (skips animation for reduced-motion)
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var countEls = document.querySelectorAll('[data-count-to]');
  if (countEls.length) {
    var counted = new WeakSet();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || counted.has(entry.target)) return;
        counted.add(entry.target);
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count-to'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;

        // reveal the donut arc, if this element has one nearby
        var arc = el.closest('svg') ? el.closest('svg').querySelector('.donut-arc') : null;
        if (arc) arc.style.strokeDasharray = arc.getAttribute('data-arc');

        if (reduceMotion) {
          el.textContent = target.toFixed(decimals) + suffix;
          return;
        }

        var start = null;
        var duration = 1200;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = target * eased;
          el.textContent = value.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { obs.observe(el); });
  }

  // Carousel (blueprint slides on the STEAM Labs page)
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    var dotsWrap = carousel.querySelector('[data-dots]');
    var prevBtn = carousel.querySelector('[data-prev]');
    var nextBtn = carousel.querySelector('[data-next]');
    var current = slides.findIndex(function (s) { return s.classList.contains('active'); });
    if (current < 0) current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === current) dot.classList.add('active');
      dot.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(dot);
    });

    function go(index) {
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
