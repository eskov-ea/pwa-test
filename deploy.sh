#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:eskov-ea/pwa-test.git master:gh-pages

cd -