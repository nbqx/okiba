var _u = timbre.utils;
var bpm = 100;
var sw = 1.0; // use testing for swing

var _ = function(n){
  return _u.bpm2msec(bpm,n)
};

var __ = function(n){
  return _u.mtof(_u.atom(n))
};

Drumkit = this.Drumkit || {};

Drumkit.rnd_seq_change = function(seqs){
  var r = Math.floor(Math.random()*seqs.length);
  var ret = seqs[r];
  return ret
};

// bassdrum section

Drumkit.bd = function(vol){
  var osc = T("sin", 120, 2.8);
  osc = T("+", osc, T("pulse",40,0.7));
  osc = T("rlpf", 140, 0.5, osc);
  var env = T("perc", 30).set("mul",vol);
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Drumkit.bd_loop = function(n){
  var self = this;
  var seq = self.current_bd_seq[n];
  var fn = function(s){
    var cur = s[0];
    var rest = s.slice(1);
    var tmr = T("timeout",cur.len,function(){
      if(rest.length!==0) fn(rest);
    }).on();
    self.bd(cur.vol);
  };
  fn(seq);
};

Drumkit.bd_seqs = [
  [
    [{vol:0.8, len: _(4)}],
    [{vol:0.8, len: _(4)}],
    [{vol:0.8, len: _(4)}],
    [{vol:0.8, len: _(4)}]
  ],
  [
    [{vol:0.8, len: _(4)}],
    [{vol:0.8, len: _(16)},{vol:0.8, len: _(16)+_(8)},],
    [{vol:0.8, len: _(16)},{vol:0.8, len: _(16)+_(8)},],
    [{vol:0.8, len: _(16)},{vol:0.8, len: _(16)+_(8)},],
  ],
  [
    [{vol:0, len: _(16)},{vol:0.8, len: _(16)},{vol:0.8, len: _(8)}],
    [{vol:0, len: _(4)}],
    [{vol:0, len: _(8)},{vol:0.8, len: _(16)},{vol:0.8, len: _(16)}],
    [{vol:0, len: _(4)}]
  ]
];

Drumkit.current_bd_seq = Drumkit.bd_seqs[1];

// snare section

Drumkit.sd = function(vol){
  var osc = T("noise");
  osc = T("+", osc, T("*",T("pulse",20), 0.3));
  osc = T("rbpf", 2200, 0.6, osc);
  var env = T("perc",180).set("mul",vol);
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Drumkit.sd_loop = function(n){
  var self = this;
  var seq = self.current_sd_seq[n];
  var fn = function(s){
    var cur = s[0];
    var rest = s.slice(1);
    var tmr = T("timeout",cur.len,function(){
      if(rest.length!==0) fn(rest);
    }).on();
    self.sd(cur.vol);
  };
  fn(seq);
};

Drumkit.sd_seqs = [
  [
    [{vol:0, len: _(4)}],
    [{vol:0.7, len: _(4)}],
    [{vol:0, len: _(4)}],
    [{vol:0.7, len: _(4)}]
  ],
  [
    [{vol:0, len: _(4)}],
    [{vol:0.7, len: _(4)}],
    [{vol:0.0, len: _(4)}],
    [{vol:0.5, len: _(16)},{vol:0.0, len: _(16)},{vol:0.5, len: _(16)},{vol:0.5, len: _(16)}]
  ],
  [
    [{vol:0, len: _(4)}],
    [{vol:0.7, len: _(4)}],
    [{vol:0, len: _(4)}],
    [{vol:0.0, len: _(16)},{vol:0.7, len: _(16)+_(8)}]
  ],
  [
    [{vol:0, len: _(4)}],
    [{vol:0.7, len: _(4)}],
    [{vol:0, len: _(16)},{vol:0.5, len: _(8)}],
    [{vol:0.7, len: _(4)}]
  ]
];

Drumkit.current_sd_seq = Drumkit.sd_seqs[0];

// hihat section

Drumkit.hh = function(vol,dur){
  var dur = (dur===undefined)? 100 : dur;
  var osc = T("noise");
  osc = T("rhpf", 12000, 0.8, osc);
  var env = T("perc", dur).set("mul",vol);
  var s = T("*",osc,env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  }
};

Drumkit.hh_loop = function(n){
  var self = this;
  var seq = self.current_hh_seq[n];
  var fn = function(s){
    var cur = s[0];
    var rest = s.slice(1);
    var tmr = T("timeout",cur.len,function(){
      if(rest.length!==0) fn(rest);
    }).on();
    self.hh(cur.vol, cur.dur);
  };
  fn(seq);
};

Drumkit.hh_seqs = [
  [
    [{vol:0.3, dur: 30, len: _(8)},{vol:0.2, dur: 30, len: _(8)}],
    [{vol:0.3, dur: 30, len: _(8)},{vol:0.2, dur: 30, len: _(8)}],
    [{vol:0.3, dur: 30, len: _(8)},{vol:0.2, dur: 30, len: _(8)}],
    [{vol:0.3, dur: 30, len: _(8)},{vol:0.2, dur: 30, len: _(8)}]
  ],

  [
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)}],
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)}],
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.3, dur: 300, len: _(8)}],
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)}]
  ],

  [
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)}],
    [{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 30, len: _(16)},{vol:0.2, dur: 300, len: _(16)},{vol:0.2, dur: 30, len: _(16)}],
    [{vol:0.2, dur: 30, len: _(8)},{vol:0.2, dur: 30, len: _(8)}],
    [{vol:0.2, dur: 300, len: _(8)},{vol:0.2, dur: 300, len: _(8)}]
  ],
  
  // 1拍ごとのループなので3連符ずれないはず
  [
    [{vol:0.2, dur: 30, len: _(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 300, len:_(8)}],
    [{vol:0.2, dur: 30, len: _(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 300, len:_(8)}],
    [{vol:0.2, dur: 30, len: _(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 300, len:_(8)}],
    [{vol:0.2, dur: 30, len: _(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 300, len:_(8)}]
  ],

  [
    [{vol:0.2, dur: 300, len: _(8)},
     {vol:0.2, dur: 30, len: _(16)},
     {vol:0.2, dur: 30, len: _(16)}],

    [{vol:0.2, dur: 300, len: _(8)},
     {vol:0.2, dur: 30, len: _(16)},
     {vol:0.2, dur: 30, len: _(16)}],

    [{vol:0.2, dur: 30, len: _(16)},
     {vol:0.2, dur: 30, len: _(16)},
     {vol:0.2, dur: 300, len: _(8)}],
    
    [{vol:0.2, dur: 30, len: _(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 30, len:_(8)/3},
     {vol:0.2, dur: 300, len:_(8)}]
  ]
];

Drumkit.current_hh_seq = Drumkit.hh_seqs[0];

var syn = function(freq){
  var freq = (freq!==undefined)? freq : Math.random()*1500+100;
  var osc = T("fami",freq);
  osc = T("rlpf",8000,0.8,osc);
  var env = T("perc", 80).set("mul",0.3);
  var s = T("*",osc,env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  }
};

