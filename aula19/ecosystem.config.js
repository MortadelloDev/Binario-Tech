module.exports = {
  apps: [
    {
      name: 'api-telemetria-dev',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3030
      },
      watch: true,
      ignore_watch: ['node_modules', 'logs'], // Adicionado o 's'
      max_memory_restart: '100M'
    },
    {
      name: 'api-telemetria-prod',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8030
      },
      watch: false,
      max_memory_restart: '500M', // <-- Adicionada a vírgula aqui
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
