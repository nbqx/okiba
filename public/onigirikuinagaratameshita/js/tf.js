// http://dl.dropbox.com/u/264798/dev/onigirikuinagaratameshita/index.html
String.prototype.mkSeq = function(){
  var self = this;
  var a = self.split('');
  return a.map(function(i){
    if(i==='*'){ return 1 }
    else return 0;
  });
};

var bpm = 100;
var msec = (60/bpm) * (4/16) * 1000;

// bass
var syn = function(freq, d){
  var d = d || 100;
  var s = T("*", T("LPF",T("tween","exponential.out",d,12000,40).kr().bang(),T("sawup",freq)), _env=T("perc",d)).play();
  _env.addEventListener("~ended", function(){
    s.pause();
  }).bang();
};

// hi-hat
var hh = function(a,d){
  var a = a || 0.2;
  var d = d || 30;
  var h = T("*", T("HPF", 8000, T("noise")), _env = T("perc", d, a)).play();
  _env.mul = a;
  _env.addEventListener("~ended", function(){
    h.pause();
  }).bang();
};

// bassline sequence
var notes = ["A#1","C2","D#2","G2","A#2","C3"].map(function(n){return timbre.utils.atof(n)});
var seq = "****-*-***--**".mkSeq();

var dcy = 100; // mouseX: synのエンベロープのディケイ
var hth = 6; // mouseY: オープンハイハットの入りやすさ

// main loop
var loop = T("interval", msec, function(i){
  var n = Math.floor(Math.random()*notes.length);
  syn(notes[n]*seq[i&(seq.length-1)], dcy);
  var d = (Math.floor(Math.random()*10>hth))? 30 : 300;
  hh(0.7,d);
});

// interaction
$("html,body").mousemove(function(e){
  var _x_th = 300;
  var _x = e.pageX/$(window).innerWidth();
  dcy = Math.floor(_x_th*_x);

  var _y_th = 10;
  var _y = e.pageY/$(window).innerHeight();
  hth = Math.floor(_y_th*_y);
});