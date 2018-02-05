#!/bin/bash

docker build -t node-vanilla -f Dockerfile.vanilla .
docker build -t node-multi-stage -f Dockerfile.multistage .
docker build -t node-distroless -f Dockerfile.distroless .
docker build -t node-alpine -f Dockerfile.alpine .
