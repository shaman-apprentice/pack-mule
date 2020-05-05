module.exports = {
  out: 'docs',
  mode: 'file',
  theme: 'config/custom-typedoc-theme',
  includeVersion: true,
  tsconfig: 'config/tsconfig.json',
  exclude: '**/utilities.ts',
  excludePrivate: true,
};
