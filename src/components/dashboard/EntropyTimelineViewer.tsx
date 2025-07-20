{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x       # Node.js runtime (LTS & compatible)
    pkgs.yarn              # Yarn package manager
    pkgs.python311         # Python 3.11
    pkgs.python311Packages.pip
    pkgs.firebase-tools    # Firebase CLI for emulators, deploy, etc.
  ];

  shellHook = ''
    echo "🚀 Dev shell active:"
    echo " • node     $(node --version)"
    echo " • yarn     $(yarn --version)"
    echo " • python   $(python3 --version)"
    echo " • firebase $(firebase --version)"
  '';
}