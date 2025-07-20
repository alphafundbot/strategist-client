# .idx/dev.nix  (or rename to shell.nix)
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs        # Node.js runtime
    pkgs.yarn           # Yarn package manager
    pkgs.python311      # Python 3.11
    pkgs.python311Packages.pip
  ];

  shellHook = ''
    echo "🚀 Dev shell active:"
    echo "   • node $(node --version)"
    echo "   • yarn $(yarn --version)"
    echo "   • python $(python --version)"
  '';
}