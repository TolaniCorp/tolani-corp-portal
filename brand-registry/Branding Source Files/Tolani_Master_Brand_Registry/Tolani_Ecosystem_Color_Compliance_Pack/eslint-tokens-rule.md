# Tolani Token Enforcement (Recommended)

For product codebases (Next.js/React), enforce tokens by:
- centralizing colors into CSS variables or a token module
- banning literal hex usage except for the approved allowlist

Recommended approach:
1) Import `Tolani_UI_Tokens_LightDark.json` into your build step.
2) Expose CSS variables under `:root[data-division="labs"][data-theme="dark"]` etc.
3) Add ESLint rule configuration to prohibit non-token colors (custom rule or `no-restricted-syntax`).

If you want, I can generate a ready-to-install ESLint custom rule package (`eslint-plugin-tolani-brand`).
