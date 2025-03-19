module.exports = {
    apps: [

        {
            name: 'karaoke-app',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                PORT: 3317,
                NODE_ENV: 'production'
            }
        }
    ]
}