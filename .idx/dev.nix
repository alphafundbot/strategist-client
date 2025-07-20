{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.python311Packages.setuptools
    pkgs.python311Packages.wheel
    pkgs.libffi
    pkgs.openssl
    pkgs.curl
  ];

  shellHook = ''
    export PIP_PREFIX=$HOME/.local
    export PYTHONPATH=$PIP_PREFIX/lib/python3.11/site-packages:$PYTHONPATH
    export PATH=$PIP_PREFIX/bin:$PATH
    echo "Strategist cockpit activated: Python 3.11 online"
  '';
}
