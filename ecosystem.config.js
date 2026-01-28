module.exports = {
    apps : [
        {
            name: "comuneo-todo",
            script: "npm",
            args: "start",
            instances : 1,
            exec_mode : "fork",
            max_memory_restart: '100M',
            env: {
                "PORT": 9900,
                "NODE_ENV": "development"
            },
        }
    ]
}