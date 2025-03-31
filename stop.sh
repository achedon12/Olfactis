#!/bin/bash

# Stop the frontend development server
# shellcheck disable=SC2009
ps -ef | grep "npm run dev" | grep "frontend" | grep -v grep | awk '{print $2}' | xargs kill -9

# Stop the backend development server
ps -ef | grep "npm run dev" | grep "backend" | grep -v grep | awk '{print $2}' | xargs kill -9