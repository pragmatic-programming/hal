#!/bin/bash

echo "Pull Images:"
docker pull python:3.6

echo "Build Images:"
docker build --tag com.github.com.ssmifi.hal.server.javascripthon:latest JavaScripthon
