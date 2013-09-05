sc.unuse('prototype');

var clock = timbre.timevalue("BPM93 L16");
var dict = {
  1: clock*16, 
  2: clock*8, 
  4: clock*4, 
  8: clock*2, 
  16: clock, 
  32: clock/2,
  64: clock/4
};
var dic = T('ndict',{dict: dict});

var m2f = function(base){
  var notes = new sc.Scale(sc.series(12));
  return function(oct,n){
    return sc.midicps(base+(oct*12)+notes.at(n))}};

var play = function(synth){
  var fn = synth;
  return function(sequence){
    var _seq_ = sequence;
    var _fn_ = function(s){
      var head = s[0];
      var rest = s.slice(1);

      var obj = {};
      var note;

      for(var k in head){
        switch(k){
          case "n":
            note = (head.n!==null&&head.n!==undefined)? head.n : null;
            break;
          case "d":
            var dur = head.d || 0;
            obj.dur = (dur instanceof Array)? dic.at(dur[0])*dur[1] : dic.at(dur);
            break;
          case "v":
            obj.vol = head.v || 0;
            break;
          default:
            obj[k] = head[k];
            break;
        }
      };

      T('timeout',{timeout: obj.dur}, function(){
        if(rest.length!==0) _fn_(rest);
      }).start();

      if(note instanceof Array){
        note.forEach(function(n){
          obj.note = n;
          fn(obj);
        });
      }else{
        obj.note = note;
        fn(obj);
      }
    };

    _fn_(_seq_);
  };
};

var fplay = function(synth){
  var fn = synth;
  return function(generator){
    var _fn_ = function(s){
      var head = s[0];
      var rest = s.slice(1);

      var obj = {};
      var note;

      for(var k in head){
        switch(k){
          case "n":
            note = (head.n!==null&&head.n!==undefined)? head.n : null;
            break;
          case "d":
            var dur = head.d || 0;
            obj.dur = (dur instanceof Array)? dic.at(dur[0])*dur[1] : dic.at(dur);
            break;
          case "v":
            obj.vol = head.v || 0;
            break;
          default:
            obj[k] = head[k];
            break;
        }
      };

      T('timeout',{timeout: obj.dur}, function(){
        if(rest.length!==0) _fn_(generator());
      }).start();

      if(note instanceof Array){
        note.forEach(function(n){
          obj.note = n;
          fn(obj);
        });
      }else{
        obj.note = note;
        fn(obj);
      }

    };
    _fn_(generator());
  };
};

// シーケンスはこういうかんじで
var bd_seq = [
  {d:16, v:0.5},
  {d:8, v:0.9},
  {d:16, v:0.5},
  {d:4, v:0.0},
  {d:8, v:0.9},
  {d:16, v:0.9},
  {d:16, v:0.9},
  {d:4, v:0.0}
];

// objectを引数にとる関数にしとく
function bd(o){
  var osc = T('sin', {freq:50, mul:4.0});
  osc = T('+',T('noise',{mul:3.0}),osc);
  osc = T('clip',{minmax:0.5},osc);
  osc = T('lpf',{freq:180, Q:10}, osc);
  var env = T('perc',{a:0, d:30, r:150, mul:o.vol},osc);
  env.on('ended', function(){ 
    this.pause();
  });
  env.bang().play();
};

var sd_seq = [
  {d:4,v:0.0},
  {d:4,v:0.5},
  {d:16,v:0.0},
  {d:16,v:0.2},
  {d:16,v:0.0},
  {d:16,v:0.0},
  {d:4,v:0.5}
];

function sd(o){
  var osc = T('noise');
  osc = T('+',T('pulse',{freq:20,mul:0.4}),osc);
  osc = T('hpf',{freq:2500, Q:15},osc);
  osc = T("comp", {thre:-10, knee:20, ratio:10, gain:2}, osc);
  var env = T('adsr',{a:0, d:80,s:0.2,r:280,mul:o.vol},osc);
  T('timeout',{timeout:80}).on('ended',function(){ 
    env.release();
    this.stop()
  }).start();
  env.on('ended',function(){
    this.pause();
  });
  env.bang().play();
}

var c = m2f(38);
var bass_seq = [
{d:8, v:0.0, n:c(1,0)},
{d:8, v:0.4, n:c(1,7)},
{d:8, v:0.4, n:c(1,9)},
{d:8, v:0.4, n:c(1,7)},
{d:8, v:0.0, n:c(0,5)},
{d:8, v:0.4, n:c(1,0)},
{d:8, v:0.4, n:c(1,2)},
{d:8, v:0.4, n:c(1,0)},
{d:8, v:0.0, n:c(0,4)},
{d:8, v:0.4, n:c(0,11)},
{d:8, v:0.4, n:c(1,0)},
{d:8, v:0.4, n:c(0,11)},
{d:8, v:0.0, n:c(0,9)},
{d:8, v:0.4, n:c(0,9)},
{d:8, v:0.4, n:c(1,7)},
{d:8, v:0.4, n:c(1,4)}
];
function syn1(o){
  var osc = T("pluck",{freq:o.note,mul:o.vol}).bang();
  osc = T('+',T('sin',{freq:o.note,mul:0.35}),osc);
  var freq = T('param',{value:3500}).expTo(90,dic.at(16));
  osc = T('lpf',{freq:freq,Q:10},osc);
  var env = T('perc',{a:0,d:80,r:dic.at(2),mul:0.23},osc);
  env.on('ended',function(){this.pause()});
  env.bang().play();
};
function syn2(o){
  var osc = T("pluck",{freq:o.note,mul:o.vol}).bang();
  osc = T("chorus", {type: 'tri',delay:80, rate:3, depth:30, fb:0.7, mix:0.8}, osc);
  osc = T('hpf',{freq:2300,Q:20,mul:1.0},osc);
  var env = T("adshr", {a:30,d:80,s:0.8,r:500,h:3000,lv:0.45}, osc);
  env.on('ended',function(){this.pause()});
  env.bang().play();
};

var hh_seq = [
  {v:0.3,d:4,n:0,rl:30},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:8,n:0,rl:300},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:16,n:0,rl:30},
  {v:0.3,d:4,n:0,rl:300}
];

function hh(o){
  var dur = dur;
  var osc = T('noise');
  var freq = T('param',{value:1800}).linTo(2400,45);
  osc = T('hpf', {freq: freq, Q: 50, mul: 0.4}, osc);
  var env = T('perc', {a:0, d:40, r: o.rl, mul: o.vol}, osc);
  env.on('ended',function(){
    this.pause();
  });
  env.bang().play();
};

function start(){
  T('interval',{interval: dic.at(4)},function(c){
    var beat = c%4;
    if(_o_>0.4&&beat===0) play(bd)(bd_seq);
    if(_o_>0.3&&beat===0) play(sd)(sd_seq);
    if(_o_>0.5&&c%8===0) play(syn1)(bass_seq);
    if(beat===0) fplay(syn2)(function(){
      var _c = m2f(38);
      var nl = [0,2,4,7,9,11];
      var vl = [0,0.9];
      var dl = [2,4,8,16,32];
      var l = _.random(1,4);

      var seq = [];
      for(var i=0; i<l; i++){
        var n = _c(_.random(1,2),nl[_.random(0,nl.length-1)]);
        var v = vl[_.random(0,vl.length-1)];
        var d  = dl[_.random(0,dl.length-1)];
        seq.push({n:n,d:d,v:0.9});
      }
      return seq;
    }); 
    if(_o_>0.1&&beat===0) play(hh)(hh_seq);
  }).start();
};

window._s_ = 0;
window._o_ = 0;
$(function(){
  start();
  var w = $(document.getElementById('w'));
  var o = $(document.getElementById('o'));
  var _h = w.height();
  $(window).scroll(function(){
    _s_ = $(this).scrollTop();
    _o_ = _s_ / _h;
    if(_o_<0.1) o.text('');
    if(_o_>0.1) o.text('HiHat');
    if(_o_>0.3) o.text('Snare');
    if(_o_>0.4) o.text('Kick');
    if(_o_>0.5) o.text('Bass');
  });
})