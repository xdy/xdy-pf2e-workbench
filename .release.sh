MANIFEST_SEARCH_PATTERN='(\s\"(manifest)\"\: \"https:\/\/github.com\/xdy\/xdy-pf2e-workbench\/releases\/).*(\/(module.json)\",)'
DOWNLOAD_SEARCH_PATTERN='(\s\"(download)\"\: \"https:\/\/github.com\/xdy\/xdy-pf2e-workbench\/releases\/).*(\/(xdy-pf2e-workbench.zip)\",)'
#For version specific download
VERSION_MAIN_REPLACE="\1download/v$1\3"
#For latest download
LATEST_MAIN_REPLACE="\1latest/download\3"

sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/" static/module.json &&
sed -i -r s"~${MANIFEST_SEARCH_PATTERN}~${LATEST_MAIN_REPLACE}~" static/module.json &&
sed -i -r s"~${DOWNLOAD_SEARCH_PATTERN}~${VERSION_MAIN_REPLACE}~" static/module.json &&
cp static/module.json dist &&
cp CHANGELOG.md dist &&
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/" package.json &&
pnpm install &&
cd dist || exit &&
zip -r xdy-pf2e-workbench.zip ./* &&
cd ..
