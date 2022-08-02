
# Table of Contents

1.  [Skelapi](#orgd64d8e9)
2.  [Installation](#org4175395)
3.  [Usage](#org8a677eb)
    1.  [Synopsis](#org318a53f)
    2.  [Simple example:](#org320ebab)
4.  [TODOs](#org7e50139)

![skellies](./skellies.webp)

<a id="orgd64d8e9"></a>

# Skelapi

A CLI tool for playing with the Zengine API.


<a id="org4175395"></a>

# Installation

Clone the repo. once cloned, change into the project directory.

    git clone git@github.com:chris-p1/skelapi.git
    cd skelapi

Change the executable permissions on `index.js`.

    chmod +x index.js

Install the npm package globally

    npm install -g


<a id="org8a677eb"></a>

# Usage


<a id="org318a53f"></a>

## Synopsis

    skelapi <command> <resource> <resource-id> --env <env> --token <token> [--help] [--version] [--within <id>]

`skelapi` takes a request type, i.e, `get`, `put`, `post`, or `del`, which it then applies to a `resource`&#x2013;That is, the data you are trying to request from Zengine. To see a full list of all available resources, see `--help`.


<a id="org320ebab"></a>

## Simple example:

    skelapi print forms 1234 -v -p --env prod --token myreallylongaccesstoken

`skelapi` also supports the use of a `.env` file, so the `--token` and `--env` arguments can be set from this file instead of being passed as an argument.

The `.env` file can be set by prefixing with `SKELAPI`.

    SKELAPI_ACCESS_TOKEN=mytoken
    SKELAPI_ENV=stage

Now, the shorter command will work.

    skelapi print forms 1111 -v -p


<a id="org7e50139"></a>

# Features

## Composability

Skelapi was designed with composability in mind. Functions are kept as small and single-purpose as possible to encourage reusability. The goal is to enable rapid development of additional commands. New commands can be added with relative ease. The `./lib/cmds` folder contains every command available to the CLI. From there, you can build your own by composing new functionality from the existing utilities and commands.

# TODOs

Feel free to use this however you see fit! I'll take any PRs as well.

