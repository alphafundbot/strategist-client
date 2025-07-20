{
  pkgs ? import <nixpkgs> {}
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    python3
    python3Packages.pip
    python3Packages.setuptools
    python3Packages.wheel
    pkgs.libffi
    pkgs.openssl
    pkgs.curl
  ];

  shellHook = ''
    export PIP_PREFIX=$HOME/.local
    export PYTHONPATH=$PIP_PREFIX/lib/python3.*/site-packages:$PYTHONPATH
    export PATH=$PIP_PREFIX/bin:$PATH
    echo "Strategist cockpit: Python + Gemini environment activated."
  '';
}

