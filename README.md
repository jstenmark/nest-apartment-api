

## Find WSL IP
```shell
# From WSL
ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'

# From Host
netsh interface ipv4 show neighbors # vEthernet (WSL (Hyper-V firewall))
```

## todo
- auth guards
- http exception filter
- pino logger