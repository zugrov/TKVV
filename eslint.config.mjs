import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    rules: {
      "react/jsx-no-target-blank": "off",
    },
  },
];

export default config;
