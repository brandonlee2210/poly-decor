export const theme = Object.freeze({
    token: {
      colorPrimary: "#5C469C",
      colorLink: "green",
      // hover color
      colorPrimaryHover: "#5C469C",
      colorLinkActive: "#00AA67",
      colorLinkHover: "#00AA67",
      wireframe: false,
      fontSize: 14,
      borderRadius: 4,
      sizeStep: 4,
      fontFamily: `'Nunito', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
      lineHeight: 1.5714285714285714,
      colorError: "#ED0131",
      fontSizeXL: 20,
      fontSizeLG: 16,
      fontSizeMD: 14,
    },
    components: {
      Radio: {
        // orange color
        colorPrimary: "orange"
      },
      Input: {
        controlHeight: 48,
        borderRadius: 4
      },
      Button: {
        controlHeight: 60,
        borderRadius: 10
      },
      Select: {
        controlHeight: 48,
        borderRadius: 4
      }
    }
  });