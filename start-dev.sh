#!/bin/bash
(cd web && yarn run dev) & (cd api && yarn run start:dev) 