# minimal-shell.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python311
    pkgs.python311Packages.pip
  ];

  shellHook = ''
    echo "🚀 Minimal Python 3.11 shell with pip active"
  '';
}