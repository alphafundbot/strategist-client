{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x         # Node.js v18 runtime (available)
    pkgs.yarn                # Yarn package manager
    pkgs.python311           # Python 3.11
    pkgs.python311Packages.pip
    pkgs.firebase-tools      # Firebase CLI
  ];

  shellHook = ''
    echo "🚀 Dev shell active:"
    echo " • node     $(node --version)"
    echo " • yarn     $(yarn --version)"
    echo " • python   $(python --version)"
    echo " • firebase $(firebase --version)"
  '';
}