{ pkgs, ... }:

{
  languages.javascript = {
    enable = true;
    pnpm.enable = true;
    package = pkgs.nodejs_22;
  };

  enterShell = ''
    echo "node $(node --version) | pnpm $(pnpm --version)"
  '';
}
