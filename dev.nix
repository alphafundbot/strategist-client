with import <nixpkgs> {};

mkShell {
  buildInputs = [
    # Nix’s Python 3.11 with pip support
    (python3.withPackages (ps: with ps; [ pip setuptools wheel ]))
    libffi        # needed by google-crc32c etc.
    openssl       # transport for many google APIs
    curl
    nano          # a little editor, because VS Code’s tasks pop out sometimes
  ];

  shellHook = ''
    export PIP_PREFIX=$HOME/.local
    export PATH=$PIP_PREFIX/bin:$PATH
    export PYTHONPATH=$PIP_PREFIX/lib/python3.11/site-packages:$PYTHONPATH

    # idempotently install SDKs
    pip install --upgrade --prefix=$PIP_PREFIX google-cloud-aiplatform vertexai >/dev/null 2>&1 || true

    echo "🚀 Strategist cockpit online: Python3.11 + pip + Gemini SDKs"
  '';
}