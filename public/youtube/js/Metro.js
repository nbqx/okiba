Metro = this.Metro = function(bpm){
  var self = this;  
  
  self.bpm = bpm || 120;
  self.msec = timbre.utils.bpm2msec(self.bpm, 4);
  self._funcs = {'_default_':function(i){/*console.log(i.count)*/}};

  self.loopFunc = function(){
    for(var k in self._funcs){
      var v = self._funcs[k];
      if(typeof v === "function"){
        v.apply(self,[interval]);
      }
    }
  }.bind(self);
  
  var interval = self.interval = T("interval", self.msec, self.loopFunc);

  return self
};

Metro.prototype.fnames = function(){
  var self = this;
  var names = [];
  for(var k in self._funcs){
    names.push(k);
  }
  return names
};

Metro.prototype.add = function(k,fn){
  var self = this;
  self._funcs[k] = fn;
};

Metro.prototype.remove = function(k){
  var self = this;
  var _f = self.fnames();
  if(_f.indexOf(k)>-1){
    delete self._funcs[k];
  }
  return self.fnames()
}

Metro.prototype.run = function(){
  var self = this;
  self.interval.on();
};

Metro.prototype.stop = function(){
  var self = this;
  self.interval.off();
};

// test
// テスト用シンセ
var syn = function(freq,vol){
  console.log(freq);
  var osc = T("pulse",freq,0.3);
  osc = T("rlpf",4000,0.9,osc);
  var env = T("perc",1000).set("mul",vol);
  var s = T("*",osc,env.bang()).play();

  // http://mohayonao.github.com/timbre/documents/efx.dist.html
  var dist = T("efx.dist",-80,-80,5400,s).play();

  env.onended = function(){
    s.pause();
    dist.pause();
  };
};

// main
var metro = new Metro(86);
//metro.run();

metro.add('cont',function(i){
  var cnt = i.count;
  
  // 4小節ごとのアタマ
  if(cnt%4===0){
    //console.log(cnt);
  }
  
  // 1小節1拍ずつ
  //console.log(cnt);

  // 2小節1拍ずつ
  //console.log(cnt%8);
});

