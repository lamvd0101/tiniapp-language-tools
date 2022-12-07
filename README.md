# Tini App Language Tools

## What is Tini App Language Tools?

Tini App Language Tools a library implementing the Language Server Protocol (LSP). LSP powers the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=tiniapp-vsce), which is also hosted in this repository. Additionally, LSP is capable of powering plugins for [numerous other IDEs](https://microsoft.github.io/language-server-protocol/implementors/tools/).

## Packages

This repo uses [`yarn workspaces`](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/), which TLDR means if you want to run a commands in each project then you can either `cd` to that directory and run the command, or use `yarn workspace [package_name] [command]`.

For example `yarn workspace tiniapp-vsce build`.

### [`tiniapp-vsce`](packages/tiniapp-vsce)

This VSCode extension adds support for effectively editing, refactoring, running, and reloading a [Tini App](https://developers.tiki.vn).

### [`tiniapp-jsapi-plugin`](packages/tiniapp-jsapi-plugin)

Tini App JSApi Plugin is a typescript server plugin that adds intellisense to [Tini App JSApi](https://developers.tiki.vn/docs/api/overview).

## Development

### Setup

Pull requests are encouraged and always welcome. [Pick an issue](https://github.com/tikivn/tiniapp-language-tools/issues?q=is%3Aopen+is%3Aissue+sort%3Aupdated-desc) and help us out!

To install and work on these tools locally:

> Make sure to uninstall the extension from the marketplace to not have it clash with the local one.

```bash
# Clone the repo
git clone https://github.com/tikivn/tiniapp-language-tools.git tiniapp-language-tools
cd tiniapp-language-tools

# Install dependencies
yarn
```

> Do not use npm to install the dependencies, as the specific package versions in `yarn.lock` are used to build and test Tini App.

To build all of the tools, run:

```bash
yarn build
```

The tools are written in [TypeScript](https://www.typescriptlang.org/), but don't let that put you off — it's basically just JavaScript with type annotations. You'll pick it up in no time. If you're using an editor other than [Visual Studio Code](https://code.visualstudio.com/) you may need to install a plugin in order to get syntax highlighting and code hints etc.

## Run

To run the VSCode extension:

- Open the root of this repo in VSCode
- Make sure "Run VSCode Extension" is selected, and hit run
- Then, inside the editor, press F5. This will compile and run the extension in a new Extension Development Host window.

Please follow the [Get Started](https://code.visualstudio.com/api/get-started/your-first-extension) document to get the extension running.

## License

[MIT](LICENSE)

## Credits

- [hoangviet](https://github.com/hoangviet) owns the Tini App Language Tools
- [lamvd0101](https://github.com/lamvd0101) for creating the Tini App Language Tools
- [lyluongthien](https://github.com/lyluongthien) for maintaining the Tini App Language Tools
