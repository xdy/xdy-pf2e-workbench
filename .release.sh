SEARCH_PATTERN='(\s\"(manifest|download)\"\: \"https:\/\/github.com\/xdy\/xdy-pf2e-workbench\/releases\/).*(\/(module.json|xdy-pf2e-workbench.zip)\",)'
BETA_REPLACE="\1download/v$1\3"
#MAIN_REPLACE="\1latest/download\3"

sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" module.json &&
    sed -i -r s"~$SEARCH_PATTERN~$BETA_REPLACE~" module.json &&
    sed -i -r s"~$SEARCH_PATTERN~$MAIN_REPLACE~" module.json &&
    cp module.json dist &&
    sed -i -e 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" package.json &&
    npm install &&
    cd dist || exit &&
    zip -r xdy-pf2e-workbench.zip ./* &&
    cd ..
