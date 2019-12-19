import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
	interface PaletteOptions {
		success?: PaletteColorOptions;
		tertiary?: PaletteColorOptions;
	}

	interface Palette {
		success: PaletteColor;
		tertiary: PaletteColor;
	}
}
