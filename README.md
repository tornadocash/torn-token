# Tornado.cash token (TORN) [![Build Status](https://github.com/tornadocash/torn-token/workflows/build/badge.svg)](https://github.com/tornadocash/torn-token/actions)

## Dependencies

1. node 12
2. yarn

## Start

```bash
$ yarn
$ cp .env.example .env
$ yarn test
```

## Deploying

Deploy to Kovan:

```bash
$ yarn deploy:kovan
```

## Mainnet deploy instructions

1. in torn-token repo `cp .env.example .env`
2. Specify deployment `PRIVATE_KEY` in the `.env`. It will be the owner during deployment.
3. Specify gas price in `truffle.js`
4. `yarn deploy:mainnet`

5. go to [mining](https://github.com/tornadocash/tornado-anonymity-mining) repo
6. `cp .env.example .env`
7. Specify private key and TORN address
8. yarn `yarn deploy:mainnet`

9. go to [governance](https://github.com/tornadocash/governance) repo
10. ...
11. ...
12. ...

13. in this repo modify the `config.js` file. Put all addresses that you got during deployment
14. set `ONLY_INITIALIZE` to `true` and `TORN_TO_INITIALIZE` to the token address
15. `yarn deploy:mainnet`
