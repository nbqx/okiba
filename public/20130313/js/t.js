// chiptune-like drum pattern

(function(root){
  var T = root.T || require('timbre');
  var O = root.O || null;

  function looper(bpm,synth){
    var tick =  T.timevalue('BPM'+String(bpm)+' L4');
    var fn = synth;

    return function(g){
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
            obj.dur = (dur instanceof Array)? tick*dur[0]*dur[1] : tick*dur;
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
          if(rest.length!==0){
            if(g instanceof Array){
              _fn_(rest);
            }else{
              _fn_(g());
            }
          }else{
            if(g instanceof Array){
              _fn_(g);
            }else{
              _fn_(g());
            }
          }
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

      if(g instanceof Array){
        _fn_(g);
      }else{
        _fn_(g());
      }
    };
  };

  function noiz(o){
    var midicps = T("midicps");
    midicps.midi = o.note;

    var high = midicps*8;
    var low = midicps/2;

    var swp = T("param",{value: high}).linTo(low, 100);
    var osc = T('fnoise', {freq:swp});
    var env = T("adshr", {a:0,d:10,s:0.6,r:350,h:100,mul:o.vol},osc);
    env.on('ended', function(){
      this.pause();
    });
    env.bang().play();
    if(O) O.trigger('play',o);
  };

  var seq = [{n:69,d:1,v:0.5},{n:150,d:1/2,v:0.5},{n:69,d:1,v:0.5},{n:69,d:1/2,v:0.5},{n:150,d:1,v:0.5}];
  looper(118,noiz)(seq);

})(this);