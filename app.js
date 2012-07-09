(function(){
  var fs, path, express, app, listFiles, omit, getMeta, getREADME;
  __import(global, require('prelude-ls'));
  __import(global, require('date-utils'));
  fs = require('fs');
  path = require('path');
  express = require('express');
  app = express.createServer();
  app.configure(function(){
    app.use(
    express['static'](__dirname + '/public'));
  });
  app.register('.haml', require('hamljs/lib/haml.js'));
  app.set('view engine', 'haml');
  app.get('/', function(req, res){
    var files;
    files = listFiles("public", ['js', 'css', 'bootstrap', '.DS_Store']);
    return res.render('index', {
      locals: {
        files: files
      }
    });
  });
  listFiles = function(pa, excludes){
    var files;
    files = omit(fs.readdirSync(pa), excludes);
    return map(function(it){
      return getMeta(pa, it);
    }, files).sort(function(a, b){
      return a.mtime < b.mtime;
    });
  };
  omit = function(lst, n){
    n = n instanceof Array
      ? n
      : [n];
    return reject(function(it){
      return __in(it, n);
    }, lst);
  };
  getMeta = function(dir, name){
    var mtime;
    mtime = fs.statSync(dir + "/" + name).mtime;
    return listToObj([['name', name], ['mtime', mtime], ['memo', getREADME(dir + "/" + name).replace(/(\r|\n|\r\n)/g, "<br/>")]]);
  };
  getREADME = function(pa){
    var t;
    t = fs.statSync(pa);
    if (t.isDirectory()) {
      if (path.existsSync(pa + "/README")) {
        return fs.readFileSync(pa + "/README", "utf-8");
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  app.listen(
  process.env.PORT || 12345);
  if (app.settings.env === 'development') {
    console.log(
    "applications start: " + JSON.stringify(app.address()));
  }
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function __in(x, arr){
    var i = 0, l = arr.length >>> 0;
    while (i < l) if (x === arr[i++]) return true;
    return false;
  }
}).call(this);
