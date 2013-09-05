global <<< require \prelude-ls
global <<< require \date-utils
fs = require \fs
express = require \express

app = express!

## app.engine 'haml' (require 'hamljs').render
app.configure ! ->
  express.static __dirname + '/public' |> app.use
  app.set 'views', __dirname+'/views'
  app.set 'view engine' 'jade'

app.get '/' !(req,res) ->
  files = listFiles "public", [\js \css \bootstrap \.DS_Store]
  res.render 'index' files: files

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
  pairs-to-obj [[\name name]
               [\mtime mtime]
               [\memo getREADME "#dir/#name" .replace //(\r|\n|\r\n)//g "<br/>"]]

## get README text
getREADME = (pa) ->
  t = fs.statSync pa
  if t.isDirectory! then
    if fs.existsSync "#pa/README" then fs.readFileSync "#pa/README" "utf-8" else ""
  else ""

## server start            
(process.env.PORT or 12345) |> app.listen

if app.settings.env is 'development'
  then "applications start" |> console.log

