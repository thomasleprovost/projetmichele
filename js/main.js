// var easingFn = function(t, b, c, d) {
// var ts = (t /= d) * t;
// var tc = ts * t;
// return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
// }
// var options = {
//   useEasing: true,
//   easingFn: easingFn,
//   useGrouping: true,
//   separator: '',
//   decimal: '',
// };
// var demo = new CountUp("target", 0, 180, 0, 100, options);
// if (!demo.error) {
//   demo.start();
// } else {
//   console.error(demo.error);
// }

var count = 0;
// Luminosité
var light = 1;
var minLight = 0.5;
var minWght = 95;
var maxWght = 165;
// Vitesse
var damping = 0.99;
var force = 0;
var mass = 12;
var acc = 0;
var speed = 0;

var opszTarget = 1;
var opsz = 1;

var h = document.querySelector('.horizontal');
var target = document.querySelector('#target');

// DOM Elements
var lightRect = document.querySelector('.light-rect');

var num = document.querySelector('#target');
var numSettings = [];

var km = document.querySelector('#km');

var icons = document.querySelector('#icons');

var fuel = document.querySelector('#fuel');




var darkSlateGrey = [17, 22, 63];
var silver = [192, 192, 192];

var mouseStart = [0, 0];
var mouse = [0, 0];
var mouseIsDown = false;
var wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('mousedown', function (e) {
  mouseIsDown = true;
  mouseStart = [e.clientX, e.clientY]
})

wrapper.addEventListener('mouseup', function () {
  mouseIsDown = false;
  mouseStart = [0, 0];
  mouse = [0, 0];
})

wrapper.addEventListener('mousemove', function (e) {
  e.preventDefault();
  mouse = [e.clientX, e.clientY];
})

wrapper.addEventListener('touchstart', function (e) {
  mouseIsDown = true;
  mouseStart = [e.touches[0].clientX, e.touches[0].clientY]
})

wrapper.addEventListener('touchmove', function (e) {
  e.preventDefault();
  mouse = [e.touches[0].clientX, e.touches[0].clientY]
})

wrapper.addEventListener('touchend', function () {
  mouseIsDown = false;
  // mouseStart = [0, 0];
  // mouse = [0, 0]
})



//NIGHT DAY SWITCH

// var auto = true;
// document.querySelector('.auto').addEventListener('click', function () {
//   var val = this.innerHTML;
//   if (val == 'Auto') {
//     this.innerHTML = 'Manual';
//     auto = false
//   } else {
//     this.innerHTML = 'Auto';
//     auto = true;
//   }
// })
//
// var night = true;
// document.querySelector('.mode').addEventListener('click', function () {
//   var val = this.innerHTML;
//   if (val == 'Night') {
//     this.innerHTML = 'Day';
//     night = false;
//   } else {
//     this.innerHTML = 'Night';
//     night = true;
//   }
// })

//NIGHT DAY SWITCH END



var auto = true;

// var switcher = document.getElementById("switch");
//
// switcher.onclick = function(){
//   auto !=auto;
//   console.log(auto);
// }

function colorInterpolation(color1, color2, a) {
  var color = [0, 0, 0];
  for (var i = 0; i < color1.length; i++) {
    var c1 = color1[i];
    var c2 = color2[i];
    color[i] = Math.floor(c1 * (1 - a) + c2 * a);
  }
  return color;
}

function clamp (val, min , max) {
  return Math.min(Math.max(val, min), max);
}

function map(val, inMin, inMax, outMin, outMax) {
  return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function animation () {
  numSettings = [];
  if (mouseIsDown) {
    force += 0.1;
  } else {
    force -= 0.1
  }

  force = clamp(force, 0, 5);

  acc += force / mass
  speed += acc;

  if (force == 0) {
    speed -= 0.3
  }
  speed = clamp(speed, 0, 280);
  acc *= 0;
  target.innerHTML = Math.floor(speed);
  // if (mouseIsDown) {
  //   var delta = Math.max(1, mouse[0] - mouseStart[0]);
  //   if (delta && delta > 1) {
  //     numSettings.push("'opsz' " + clamp(delta / 3, 1, 165));
  //   } else {
  //     numSettings.push("'opsz' " + 1);
  //   }
  // } else {
  //   var delta = Math.max(1, mouse[0] - mouseStart[0]);
  //   if (delta && delta > 1) {
  //     numSettings.push("'opsz' " + clamp(delta / 3, 1, 165));
  //   } else {
  //     numSettings.push("'opsz' " + 1);
  //   }
  // }
  if (auto) {
    // Luminosité
    // num.style.fontVariationSettings =  "'wght' " + (Math.round(light * (maxWght - minWght)) + minWght);
    numSettings.push("'wdth' " + map(speed, 0, 280, 95, 165));
    numSettings.push("'wght' " + map(light, 0, 1, 95, 110));

    var v50 = document.querySelector('.v-50');
    if (speed > 120) {
      opszTarget = 150;
      $('.v-50').addClass('hide');
      $('.v-120').removeClass('hide');
    } else if (speed > 50) {
      opszTarget = 70;
      $('.v-50').addClass('hide');
      $('.v-120').removeClass('hide');
    } else {
      $('.v-50').removeClass('hide');
      $('.v-120').addClass('hide');
      opsz = 1;
    }
    opsz += (opszTarget - opsz) * 0.1;
    numSettings.push("'opsz' " + opsz);
    if (!mouseIsDown) {
      count += 0.01;
      light = (Math.sin(count) + 1) * 0.5;
      lightRect.style.opacity = (1 - light) * 0.5;
      h.style.backgroundColor = 'rgb('+ colorInterpolation(silver, darkSlateGrey, 1 - light).join() +')'
      km.style.fontVariationSettings =  "'wght' " + (light * (maxWght - minWght) + minWght);
      icons.style.fontVariationSettings =  "'wght' " + (light * (maxWght - minWght) + minWght);
      fuel.style.fontVariationSettings =  "'wght' " + (light * (maxWght - minWght) + minWght);
    }
  } else {
    // if (night) {
    //   lightRect.style.opacity = 0.5;
    //   numSettings.push("'wght' " + 95);
    //   numSettings.push("'wght' " + 95);
    //   h.style.backgroundColor = 'rgb('+ colorInterpolation(silver, darkSlateGrey, 1).join() +')'
    //   km.style.fontVariationSettings =  "'wght' " + 95;
    //   icons.style.fontVariationSettings =  "'wght' " + 95;
    //   fuel.style.fontVariationSettings =  "'wght' " + 95;
    // } else {
    //   lightRect.style.opacity = 0;
    //   numSettings.push("'wght' " + 165);
    //   h.style.backgroundColor = 'rgb('+ colorInterpolation(silver, darkSlateGrey, 0).join() +')'
    //   km.style.fontVariationSettings =  "'wght' " + 165;
    //   icons.style.fontVariationSettings =  "'wght' " + 165;
    //   fuel.style.fontVariationSettings =  "'wght' " + 165;
    // }
  }

  // console.log(numSettings.join(','))
  num.style.fontVariationSettings = numSettings.join(',');

  requestAnimationFrame(animation)
}

animation()
