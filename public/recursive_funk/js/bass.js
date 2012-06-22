Bass = this.Bass || {};

Bass.cutoff = 4000;
Bass.Q = 0.9;
Bass.depth = 0.5;
Bass.jmp = true;

Bass.rnd_seq_change = function(seqs){
  var ret = Bass.current_seq;
  if(Math.random()>0.4){
    var r = Math.floor(Math.random()*seqs.length);
    ret = seqs[r];
  }
  return ret
};

Bass.bass = function(freq, vol){
  var dur = 200;
  var t = [2,4,8,16];
  if(Bass.jmp){
    freq = (Math.random()>0.3)? freq : freq*t[Math.floor(Math.random()*t.length)];
  }
  var osc = T("pulse",freq,0.3);
  osc = T("rlpf", Bass.cutoff, Bass.Q, Bass.depth, osc);
  var env = T("perc", dur).set("mul",vol);
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Bass.bass_loop = function(n){
  var self = this;
  var seq = self.current_seq[n];
  var fn = function(s){
    var cur = s[0];
    var rest = s.slice(1);
    var tmr = T("timeout",cur.len,function(){
      if(rest.length!==0) fn(rest);
    }).on();
    self.bass(cur.frq,cur.vol);
  };
  fn(seq);
};

Bass.bass_seqs = [
  [
    [{frq: __("D#1"), vol:0.8, len: _(8)+_(16)},{frq: __("C1"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(4)}],
    [{frq: __("A#0"), vol:0.8, len: _(8)+_(16)},{frq: __("C1"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(4)}]
  ],
  [
    [{frq: __("D#1"), vol:0.8, len: _(8)+_(16)},{frq: __("C1"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(4)}],
    [{frq: __("A#0"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)},{frq: __("A#0"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(16)},{frq: __("C2"), vol:0.8, len: _(8)+_(16)}]
  ],
  [
    [{frq: __("D#1"), vol:0.8, len: _(8)+_(16)},{frq: __("C1"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(4)}],
    [{frq: __("A#0"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)},{frq: __("A#0"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(16)},{frq: __("C2"), vol:0.8, len: _(8)},{frq: __("A#1"), vol:0.8, len: _(16)}]
  ],
  [
    [{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)}],
    [{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)}],
    [{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("D#1"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)}],
    [{frq: __("C1"), vol:0.8, len: _(16)},{frq: __("A#1"), vol:0.8, len: _(8)},{frq: __("A#1"), vol:0.8, len: _(16)}]
  ],
  [
    [{frq: __("C1"), vol:0.8, len: _(8)+_(16)},{frq: __("D#1"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(16)},{frq: __("G1"), vol:0.8, len: _(8)+_(16)}],
    [{frq: __("A#0"), vol:0.8, len: _(16)},{frq: __("C1"), vol:0.8, len: _(8)},{frq: __("A#0"), vol:0.8, len: _(16)}],
    [{frq: __("C1"), vol:0.0, len: _(16)},{frq: __("C2"), vol:1.0, len: _(8)},{frq: __("C2"), vol:1.0, len: _(16)}]
  ]
];

Bass.current_seq = Bass.bass_seqs[0];

