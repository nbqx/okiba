Metro = this.Metro = function(bpm){
  var self = this;  
  
  self.bpm = bpm || 120;
  self.msec = timbre.utils.bpm2msec(self.bpm, 4);
  self._m = false;
  self._funcs = {'_click_':function(i){
    var cnt = i.count%4;
    var vol = 0.5;
    if(self._m){
      if(cnt===0){
        self.click(880,vol);
      }else{
        self.click(440,vol);
      }
    }
  }};

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

Metro.prototype.click = function(freq,vol){
  var osc = T("pulse",freq);
  var env = T("perc",80).set("mul",vol);
  var s = T("*",osc,env.bang()).play();
  env.onended = function(){
    s.pause();
  };
};

Metro.prototype.clickOn = function(){
  var self = this;
  self._m = true;
};

Metro.prototype.clickOff = function(){
  var self = this;
  self._m = false;
};

// main
var metro = new Metro(110);
metro.run();

