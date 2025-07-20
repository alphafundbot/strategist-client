{ pkgs ? import <nixpkgs> {} }:
let
  baseShell = import ./minimal-shell.nix { inherit pkgs; };
in
pkgs.mkShell {
  buildInputs = baseShell.buildInputs ++ [
    pkgs.libffi
    pkgs.openssl
    pkgs.curl
    pkgs.nano
  ];
  shellHook = builtins.concatStringsSep "
" [
    baseShell.shellHook
    ''
      pip install --upgrade --prefix=$HOME/.local google-cloud-aiplatform vertexai >/dev/null 2>&1 || true
      echo "✅ Full dev shell loaded"
    ''
  ];
  # Inherit other attributes from baseShell if needed, e.g.:
  # name = baseShell.name;
}