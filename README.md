# Local Boilerplate Add-on

## Add-on Generator

There is a [Local Add-on Yeoman Generator](https://github.com/getflywheel/create-local-addon) available.

## Installation

### Clone

Clone the repository into the following directory depending on your platform:

-   macOS: `~/Library/Application Support/Local/addons`
-   Windows: `C:\Users\username\AppData\Roaming\Local\addons`

*You can replace 'Local' with 'Local Beta' if you want to create the add-on for Local Beta.*

### Install Dependencies

1. `yarn install`

### Add to Local

1. Clone repo directly into the add-ons folder (paths described above)
2. `yarn install`
2. `yarn build` or `npm run build`
3. Open Local and activate add-on

## Development

### Folder Structure

All files in `/src` will be transpiled to `/lib` using [TypeScript](https://www.typescriptlang.org/). Anything in `/lib` will be overwritten.

### Development Workflow

If you are looking for help getting started, you can consult [the documentation for the add-on generator](https://github.com/getflywheel/create-local-addon#next-steps).

## License

MIT
