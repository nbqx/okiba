var metro = new Metro(110);
metro.run();

Drum = this.Drum || {};

Drum.bd = function(vol){
  var es = T("ease","back.inout",5000,100,800).kr();
  var osc = T("saw", 100, 4.0);
  osc = T("*", T("pink",0.9), osc);
  osc = T("clip",-0.8,0.8,osc);
  osc = T("rlpf", 100, 0.8, osc);
  var env = T("adsr",0,80,0.0,130).set("mul",vol);
  env.s = 160;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Drum.sd = function(vol){
  var osc = T("noise");
  osc = T("+", osc, T("*",T("pulse",30), 0.3));
  osc = T("rhpf", 2600, 0.6, osc);
  var env = T("adsr",0,180,0.1).set("mul",vol);
  env.s = 100;
  var s = T("*", osc, env.bang()).play();
  env.onended = function(){
    s.pause();
  };
};

Drum.hh = function(vol,dur){
  var dur = (dur===undefined)? 100 : dur;
  var osc = T("noise");
  osc = T("rhpf", 12000, 0.8, osc);
  var env = T("perc", dur).set("mul",vol);
  var s = T("*",osc,env.bang()).play();
  env.onended = function(){
    s.pause();
  }
};

Drum.play = function(freq,vol){
  Drum.bd(vol);
  Drum.sd(vol);
};

Drum.bd_loop = Basis.genLoopFn("bd_seq");
Drum.sd_loop = Basis.genLoopFn("sd_seq");
Drum.hh_loop = Basis.genLoopFn("hh_seq");

Drum.seqChange = function(i){
  var seq = Seq[i] || {bd:[],sd:[],hh:[]};
  Drum.bd_seq = seq.bd;
  Drum.sd_seq = seq.sd;
  Drum.hh_seq = seq.hh;
};

Seq = [];
s0 = {
  bd:[
    [4,Drum.bd,[0.8]],
    [4,Drum.bd,[0.8]],
    [4,Drum.bd,[0.8]],
    [4,Drum.bd,[0.8]]
  ],
  sd:[],
  hh:[
    [16,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.6,30]],
    [16,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,80]],
    [16,Drum.hh,[0.6,30]],
    [16,Drum.hh,[0.6,30]],
    [16,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,80]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,80]],
    [16,Drum.hh,[0.8,30]],
    [[8,0.3],Drum.hh,[0.8,30]],
    [[8,0.3],Drum.hh,[0.8,30]],
    [[8,0.3],Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,300]]
  ]
};
s1 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]],
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]]
  ],
  hh: [
    [8,Drum.hh,[0.0,80]],
    [8,Drum.hh,[0.8,80]],
    [8,Drum.hh,[0.0,30]],
    [8,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,30]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,0]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s2 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]],
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]]
  ],
  hh: [
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s3 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [],
  hh: [
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s4 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]],
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]]
  ],
  hh: [
    [8,Drum.hh,[0.0,80]],
    [8,Drum.hh,[0.8,80]],
    [8,Drum.hh,[0.0,30]],
    [8,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,30]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,0]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s5 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]],
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]]
  ],
  hh: [
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s6 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.sd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [32,Drum.hh,[0.8,30]],
    [32,Drum.hh,[0.8,30]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.sd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.hh,[0.8,200]]
  ],
  sd: [],
  hh: [
    [8,Drum.hh,[0.0,80]],
    [8,Drum.hh,[0.8,80]],
    [8,Drum.hh,[0.0,30]],
    [8,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,30]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,0]],
    [8,Drum.hh,[0.8,200]]
  ]
};

s7 = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.sd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [32,Drum.hh,[0.8,30]],
    [32,Drum.hh,[0.8,30]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.sd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.hh,[0.8,200]]
  ],
  sd: [],
  hh: [
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.8,200]]
  ]
};

[s1,s2,s3,s4,s5,s6,s7].forEach(function(o){
  Seq.push(o);
});

Drum.seqChange(0);
metro.add('drum', function(i){
  var cnt = i.count%4;
  if(cnt===0){
    Drum.bd_loop();
    Drum.sd_loop();
    Drum.hh_loop();
  }

  if(Math.random()>0.9){
    Drum.seqChange();
  }else{
    Drum.seqChange(Math.floor(Math.random()*Seq.length));
  }
});

