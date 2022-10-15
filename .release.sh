SEARCH_PATTERN='(\s\"(manifest|download)\"\: \"https:\/\/github.com\/xdy\/xdy-pf2e-workbench\/releases\/).*(\/(module.json|xdy-pf2e-workbench.zip)\",)'
#For version specific download
VERSION_MAIN_REPLACE="\1download/v$1\3"
#For latest download
LATEST_MAIN_REPLACE="\1latest/download\3"

# Try to remember to switch to VERSION_MAIN_REPLACE just before major changes for those who remain on old foundry versions (i.e. when latest won't work)

sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" module.json &&
    sed -i -r s"~$SEARCH_PATTERN~$LATEST_MAIN_REPLACE~" module.json &&
    cp module.json dist &&
    sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" package.json &&
    npm install &&
    cd dist || exit &&
    zip -r xdy-pf2e-workbench.zip ./* &&
    cd ..
