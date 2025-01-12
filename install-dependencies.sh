#!/bin/bash
echo -e "\nInstalling web dependencies..."
cd web && yarn install

echo -e "\nInstalling api dependencies..."
cd ../api && yarn install

echo -e "\nAll dependencies installed successfully!"
cd .. 