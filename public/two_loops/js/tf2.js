var bpm = 120;
var msec = timbre.utils.bpm2msec(bpm,16);
var dur = 0;

var syn = function(freq){

  var tw = T("tween", "quintic.out", dur, freq/3, freq).kr();
  var osc = T("+", T("sawup", tw.bang(), 0.4), T("tri", tw.bang(), 0.2));
  var env = T("adsr", 0, dur, 0.000, dur);
  var s = T("*", osc, env).play();
  
  env.mul = 0.5;
  env.addEventListener("~ended",function(){
    s.pause();
  }).bang();
};

var seq = ["A#2","C3","G3","A#3","C4","G4","C5"].map(function(i){return timbre.utils.atof(i)});
var loop = T("interval",msec,function(i){
  syn(seq[Math.floor(Math.random()*seq.length)]);
});

var loop2 =T("interval",1000,function(i){
  if(dur>2000){ dur = 0 }
  dur += 10;
});

$(function(){
	$("#start").click(function(){
		timbre.on();
		loop.on();
    loop2.on();
	});
	$("#stop").click(function(){
    dur = 0;
		loop.off();
    loop2.off();
		timbre.off();
	});
  
});