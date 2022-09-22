#!/bin/bash

npm pkg set type='commonjs' && rimraf ./build && tsc
