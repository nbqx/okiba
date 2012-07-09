global <<< require \prelude-ls
global <<< require \date-utils
fs = require \fs
path = require \path
express = require \express

app = express.createServer!

app.configure ! ->
  express.static __dirname + '/public' |> app.use
app.register '.haml' require 'hamljs/lib/haml.js' # require \hamljs だとエラーでた
app.set 'view engine' 'haml'

app.get '/' (req,res) ->
  files = listFiles "public", [\js \css \bootstrap \.DS_Store]
  res.render 'index' locals: files: files

## get files in some directory
listFiles = (pa,excludes) ->
  files = (fs.readdirSync pa) `omit` excludes
  map (-> getMeta pa, it), files .sort (a,b) -> a.mtime < b.mtime

## omit file filter
omit = (lst,n) ->
  n = if n instanceof Array then n else [n]
  reject (-> it in n), lst

## get relative-path, file-name, mtime object
getMeta = (dir,name) ->
  mtime = fs.statSync "#dir/#name" .mtime
  listToObj [[\name name]
             [\mtime mtime]
             [\memo getREADME "#dir/#name" .replace //(\r|\n|\r\n)//g "<br/>"]]

## get README text
getREADME = (pa) ->
  t = fs.statSync pa
  if t.isDirectory! then
    if path.existsSync "#pa/README" then fs.readFileSync "#pa/README" "utf-8" else ""
  else ""

## server start            
(process.env.PORT or 12345) |> app.listen

if app.settings.env is 'development'
  then "applications start: " + JSON.stringify app.address! |> console.log

