import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { blue, pink, lightGreen, indigo } from "@material-ui/core/colors";

export const theme: Theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
		tertiary: {
			light: indigo[300],
			main: indigo[500],
			dark: indigo[700]
		},
		success: {
			light: lightGreen[300],
			main: lightGreen[500],
			dark: lightGreen[700]
		}
	}
});
