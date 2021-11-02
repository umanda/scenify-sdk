export const theme = {
  colors: {
    brand: {
      '50': '#f5e3ff',
      '100': '#d8b2ff',
      '200': '#bd80ff',
      '300': '#a34dff',
      '400': '#881bfe',
      '500': '#6f02e5',
      '600': '#5600b3',
      '700': '#3e0081',
      '800': '#25004f',
      '900': '#0e001f'
    },
    gray: {
      '50': '#f1f3fb',
      '100': '#d3d5dc',
      '200': '#b6b8be',
      '300': '#9a9ba1',
      '400': '#7f8084',
      '500': '#656669',
      '600': '#4c4c4f',
      '700': '#343536',
      '800': '#1e1e1f',
      '900': '#030304'
    }
  },
  fonts: {
    body: 'Inconsolata, sans-serif',
    heading: 'Inconsolata, serif',
    mono: 'Inconsolata, monospace'
  },
  styles: {
    global: function(_ref) {
      // var colorMode = _ref.colorMode;
      return {
        body: {
          // bg: colorMode === "dark" ? "gray.800" : "gray.50"
        },
        _focusVisible: {
          // boxShadow: "0 0 0 3px #d8b2ff !important"
        }
      }
    }
  },
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  components: {
    Alert: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Badge: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Button: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Checkbox: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Heading: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Input: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Slider: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Spinner: {
      baseStyle: {
        color: 'brand.300'
      },
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md'
      }
    },
    Tabs: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    },
    Tag: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand'
      }
    }
  }
}
