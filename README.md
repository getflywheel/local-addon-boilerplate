# Local Boilerplate Addon

## Installation

### Clone

Clone the repository into the following directory depending on your platform:

-   macOS: `~/Library/Application Support/Local Beta/addons`

### Install Dependencies

1. `yarn install`

### Add to Local

1. `npm pack`
2. Install the newly generated tarball from disk within Local

### Alternate Method to Add to Local

1. Clone repo directly into the addons folder (paths described above)
2. `yarn install`
2. `npm run build`
3. Open Local and activate addon

## Development

### Folder Structure

All files in `/src` will be transpiled to `/lib` using [TypeScript](https://www.typescriptlang.org/). Anything in `/lib` will be overwritten.

## License

MIT
