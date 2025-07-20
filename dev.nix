{ pkgs ? import <nixpkgs> {} }:

let
  # your minimal base shell
  baseShell = import ./minimal-shell.nix { inherit pkgs; };

  # Python 3.11 w/ flake8 and mypy
  pythonEnv = pkgs.python311.withPackages (ps: with ps; [
    flake8
    mypy
  ]);
in

pkgs.mkShell {
  buildInputs = baseShell.buildInputs ++ [
    pythonEnv
    pkgs.libffi
    pkgs.openssl
    pkgs.curl
    pkgs.nano
  ];

  shellHook = ''
    # inherit your base hook
    ${baseShell.shellHook}

    # ensure pip --user installs land in Python’s site-packages
    export PYTHONUSERBASE=$HOME/.local
    export PATH=$HOME/.local/bin:$PATH
    export PYTHONPATH=$HOME/.local/lib/python3.11/site-packages:$PYTHONPATH

    # install any SDKs you still want via pip
    pip install --upgrade --user --no-cache-dir 
      google-cloud-aiplatform vertexai >/dev/null 2>&1 || true

    echo "✅ Full dev shell loaded (flake8, mypy, vertexai & SDKs)"
  '';
}
