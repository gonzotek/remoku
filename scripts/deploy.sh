#!/usr/bin/env bash
# scripts/deploy.sh - Deploy Remoku with identity protection & multi-remote support
# Author: A. Cassidy Napoli <gonzotek@gmail.com>
set -e

export GIT_AUTHOR_NAME="A. Cassidy Napoli"
export GIT_AUTHOR_EMAIL="gonzotek@gmail.com"
export GIT_COMMITTER_NAME="A. Cassidy Napoli"
export GIT_COMMITTER_EMAIL="gonzotek@gmail.com"

# Remotes using SSH host alias github.com-gonzotek
STAGING_REMOTE="git@github.com-gonzotek:remoku-web/remoku-staging.git"
PROD_APEX_REMOTE="git@github.com-gonzotek:remoku-web/remoku-web.github.io.git"
PROD_WWW_REMOTE="git@github.com-gonzotek:remoku-web/www-remoku-web.git"
PROD_HELP_REMOTE="git@github.com-gonzotek:remoku-web/remoku-help.git"

TARGET=${1:-staging}
echo "Deploying Remoku target: [$TARGET] as $GIT_AUTHOR_NAME <$GIT_AUTHOR_EMAIL>"

case "$TARGET" in
  staging)
    echo "test.remoku.tv" > CNAME
    git push "$STAGING_REMOTE" gh-pages:gh-pages --force
    echo "Staging deployment pushed to $STAGING_REMOTE"
    ;;
  production)
    echo "Deploying to production (apex + www)..."
    # Apex domain
    echo "remoku.tv" > CNAME
    git push "$PROD_APEX_REMOTE" gh-pages:master --force
    echo "Production apex pushed to $PROD_APEX_REMOTE"
    # WWW domain
    echo "www.remoku.tv" > CNAME
    git push "$PROD_WWW_REMOTE" gh-pages:master --force
    echo "Production www pushed to $PROD_WWW_REMOTE"
    ;;
  help)
    echo "Deploying help site to $PROD_HELP_REMOTE..."
    git subtree push --prefix help "$PROD_HELP_REMOTE" gh-pages
    ;;
  *)
    echo "Usage: $0 {staging|production|help}"
    exit 1
    ;;
esac
