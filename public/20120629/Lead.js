Lead = this.Lead || {};
Lead.play = function(notes,vol){
  var notes = (notes instanceof Array)? notes : [notes];
  var freqs = notes.map(function(o){ return timbre.utils.atof(o)});
  var tw = T("ease","back.out",150,900,13000).kr();
  var osc = T("+");
  freqs.forEach(function(f){
    var t = T("ease","elastic.inout",400,f/2,f);
    var o = T("+", T("pulse",t.bang(),0.4), T("saw",t.bang(),0.8));
    osc.append(o);
  });
  osc = T("rhpf",tw.bang(),0.9,osc);
  var env = T("adsr",0,100,0.6,600).set("mul",vol);
  env.s = 1280;
  var s = T("*",osc,env.bang()).play();
  env.onended = function(){
    s.pause();
  };
};
Lead.loop = Basis.genLoopFn("seq");

Lead.seqChange = function(i){
  var seq = Lead.seqs[i] || [];
  Lead.seq = seq;
};

var s1 = [
  [[8,1.5],Lead.play,[["C4","G4","D#4"],0.4]],
  [16,Lead.play,[["C4","G4","D#4"],0.0]],
  [[8,1.5],Lead.play,[["C4","G4","D#4"],0.4]],
  [16,Lead.play,[["C4","G4","D#4"],0.0]],
  [8,Lead.play,[["C4","G4","D#4"],0.0]],
  [8,Lead.play,[["C4","F4","A#4"],0.4]],
  [8,Lead.play,[["C4","G4","D#4"],0.0]],
  [8,Lead.play,[["F4","A4","D#4"],0.4]],
  [4,Lead.play,[["C4","A4","D#4"],0.0]]
];

var s2 = [
  [8,Lead.play,[["C4","D#4"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [8,Lead.play,[["C4","D#4"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [8,Lead.play,[["C4","D#4"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [8,Lead.play,[["G4","D4"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [16,Lead.play,[["C5","D#4"],0.4]],
  [8,Lead.play,[["C4","D#4"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]],
  [16,Lead.play,[["C5","D#5"],0.4]]
];

Lead.seqs = [];
[s1,s2].forEach(function(o){ Lead.seqs.push(o)});
Lead.seq = Lead.seqs[2];

metro.add('lead',function(i){
  if(i.count%5===0){
    Lead.loop();

    if(i.count>36){
      if(Math.random()>0.8){
        if(Math.random()>0.7){
          Lead.seqChange(0);
        }else{
          Lead.seqChange();
        }
        
        if(Math.random()>0.8){
          Lead.seqChange(1);
        }
      }
    }
  }
});
