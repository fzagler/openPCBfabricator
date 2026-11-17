#!/bin/bash

if [[ $EUID > 0 ]]; then MAYBE_SUDO=sudo; fi

export DEBIAN_FRONTEND=noninteractive
$MAYBE_SUDO apt-get update -y
$MAYBE_SUDO apt-get install -y libglib2.0-bin
$MAYBE_SUDO apt-get install -y libgtkmm-2.4-1v5
LD_LIBRARY_PATH=$PWD/.libs:$LD_LIBRARY_PATH ./pcb2gcode "$@"
