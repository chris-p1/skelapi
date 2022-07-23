
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

Clone the repo.

    git clone git@github.com:chris-p1/skelapi.git

Change the executable permissions on the `skelapi` script.

    chmod +x skelapi.js


<a id="org8a677eb"></a>

# Usage


<a id="org318a53f"></a>

## Synopsis

    skelapi <reqType> <target> --for <targetId> --env <env> [--token <token>] [--help] [--version]

`skelapi` takes a request type, i.e, `get`, `put`, `post`, or `del`, which it then applies to a `target`&#x2013;That is, the data you are trying to request from Zengine. To see a full list of all available targets, see `--help`.


<a id="org320ebab"></a>

## Simple example:

    ./skelapi get forms --for 1111 --env prod --token myreallylongaccesstoken

`skelapi` also supports the use of a `.env` file, so the `--token` can be set from this file instead of being passed as an argument.

    ./skelapi get forms --for 1111 --env stage


<a id="org7e50139"></a>

# TODOs

Feel free to use this however you see fit! I'll take any PRs as well.

