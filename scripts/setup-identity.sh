#!/usr/bin/env bash
# scripts/setup-identity.sh - Ensure Git identity is locked to A. Cassidy Napoli (gonzotek)
set -e

echo "Setting repository-local Git identity..."
git config --local user.name "A. Cassidy Napoli"
git config --local user.email "gonzotek@gmail.com"

echo "Verified Git local identity:"
echo "user.name:  $(git config --local --get user.name)"
echo "user.email: $(git config --local --get user.email)"
