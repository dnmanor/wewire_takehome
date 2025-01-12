#!/bin/bash
(cd web && npm run dev) & (cd api && npm run start:dev) 