module.exports = {
  extends: ["alloy"],
  plugins: ["alloy/react", "prettier"],
  env: {
    node: true,
  },
  rules: {
    "prettier/prettier": "error",
  },
};
