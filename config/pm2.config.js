const config = require('./config.js');

const PM2 = module.exports = {
    "name": config.name,
    "script": "index.js",
    "exec_mode": "cluster",
    "node_args": "--max_old_space_size=256",
    "max_memory_restart": "512M",
    "max_restarts": 3,
    "error_file": "logs/error.log",
    "out_file": "logs/output.log",
    "watch": true,
    "ignore_watch": [
      ".git",
      "node_modules",
      "build",
      "cache",
      "assets",
      "uploads",
      "public",
      "*.db",
      "*.lock"
    ],
    "env": {
      "NODE_ENV": "development"
    },
    "env_staging": {
      "NODE_ENV": "staging"
    },
    "env_production": {
      "NODE_ENV": "production"
    }
}