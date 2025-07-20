#!/usr/bin/env bash
set -euo pipefail

# invoke nix-shell once, then run your narration
nix-shell dev.nix --run "python3 studio/gemini/narrate.py"
