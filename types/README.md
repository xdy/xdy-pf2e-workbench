This directory contains types generated from the pathfinder 2 system by running this in the pf2e git folder and then copying the dist/types folder:

```
npm run clean && npm ci && npm run build && node_modules/.bin/tsc --declaration true --emitDeclarationOnly true --noemit false --outdir dist/types --newLine lf > ~/t.txt
```

It also has these files and directories taken as-is from the pf2e system:
* foundryvtt/forks/pf2e/types/foundry/** -> types/types/foundry
* foundryvtt/forks/pf2e/static/lang/*.json -> types
