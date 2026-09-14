module.exports = {
  apps: [
    {
      name: 'portfolio-os-api',
      script: 'server/index.ts',
      interpreter: 'node',
      interpreter_args: '--import tsx/esm',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
