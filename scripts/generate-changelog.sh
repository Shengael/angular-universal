#!/bin/bash
echo "$1"
if [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]
then
    echo 'success'
    npm run build:changelog && git add .
fi
