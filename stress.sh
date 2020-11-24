!/bin/bash

stress --cpu 8 --io 4 --vm 2 --vm-bytes 128M --timeout 10s -v > stresslog.txt