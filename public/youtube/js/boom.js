Boom = this.Boom || {};

Boom.oneshot = function(vol){
  var es = T("ease","back.inout",5000,100,800).kr();
  var osc = T("fami", es.bang(), 4.0);
  osc = T("clip",-0.8,0.8,osc);
  osc = T("rlpf", 100, 0.8, osc);
  var env = T("adsr",0,100,0.5,150).set("mul",vol);
  env.s = 1360;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Boom.play = function(vol){
  var es = T("ease","back.inout",5000,100,800).kr();
  var osc = T("saw", 80, 4.0);
  osc = T("*", T("pink",0.9), osc);
  osc = T("clip",-0.8,0.8,osc);
  osc = T("rlpf", 120, 0.8, osc);
  var env = T("adsr",0,100,0.2,150).set("mul",vol);
  env.s = 260;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Boom.loop = Basis.genLoopFn("seq");
Boom.seq = [
  [4,Boom.play,[0.5]],
  [16,Boom.play,[0.5]],
  [16,Boom.play,[0.5]],
  [8,Boom.play,[0.5]],
  [8,Boom.play,[0.5]],
  [16,Boom.play,[0.0]],
  [16,Boom.play,[0.5]],
  [4,Boom.play,[0.5]]
];

Snare = this.Snare || {};
Snare.loop = Basis.genLoopFn("seq");
Snare.play = function(vol){
  var osc = T("pink",0.4);
  osc = T("+", osc, T("*",T("pulse",500), 0.8));
  osc = T("rhpf", 220, 0.8, osc);
  //var env = T("perc",180).set("mul",vol);
  var env = T("adsr",0,80,0.4,400).set("mul",vol);
  env.s = 200;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};
Snare.seq = [
  [4,Snare.play,[0.0]],
  [4,Snare.play,[0.5]],
  [4,Snare.play,[0.0]],
  [8,Snare.play,[0.0]],
  [8,Snare.play,[0.5]]
];

Syn = this.Syn || {};
Syn.play = function(freq,vol){
  var dur = 100;
  var tw = T("ease", "quintic.out", dur, freq/3, freq).kr();
  //var osc = T("+", T("saw", tw.bang(), 0.4), T("fami", tw.bang(), 0.2));
  var osc = T("+", T("saw", freq, 0.4), T("fami", freq, 0.6));
  var env = T("adsr", 0, dur, 0.5, 100).set("mul",vol);
  env.s = 100;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};
Syn.loop = Basis.genLoopFn("seq");
Syn.seq = [
  [8,Syn.play,[timbre.utils.atof("C1"),0.0]],
  [8,Syn.play,[timbre.utils.atof("C2"),0.7]],
  [8,Syn.play,[timbre.utils.atof("C1"),0.0]],
  [16,Syn.play,[timbre.utils.atof("G1"),0.7]],
  [16,Syn.play,[timbre.utils.atof("G2"),0.7]],
  [8,Syn.play,[timbre.utils.atof("C1"),0.0]],
  [16,Syn.play,[timbre.utils.atof("D1"),0.7]],
  [16,Syn.play,[timbre.utils.atof("D2"),0.7]],
  [8,Syn.play,[timbre.utils.atof("C1"),0.0]],
  [8,Syn.play,[timbre.utils.atof("C2"),0.7]]
];

metro.add('boom', function(i){
  var c4 = i.count%4;
  if(c4===0){
    Syn.loop();
  }

  if(Math.random()>0.9){
    Boom.oneshot();
  }
});

