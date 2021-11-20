export const objects = {
  staticText: {
    type: 'StaticText',
    width: 320,
    fontSize: 27,
    metadata: {
      text: 'Add some static body text',
      fontFamily: 'Inconsolata'
    }
  },
  dynamicText: {
    type: 'DynamicText',
    width: 120,
    fontSize: 27,
    metadata: {
      text: 'Add some {{dynamic}} body text'
    }
  },
  staticImage: {
    type: 'StaticImage',
    metadata: {
      src: 'https://i.ibb.co/JB3y2ts/mclogo.jpg'
    }
  },
  staticPath: {
    left: 0,
    top: 0,
    width: 60,
    height: 60,
    originX: 'left',
    originY: 'top',
    opacity: 0.5,
    scaleX: 4,
    scaleY: 4,
    type: 'StaticPath',
    metadata: {
      value: [['M', 60, 0], ['L', 0, 0], ['L', 0, 60], ['L', 60, 60], ['L', 60, 0], ['Z']],
      fill: '#CBCBCB',
      preview: 'https://d3q7mfli5umxdg.cloudfront.net/1635011325399_603749.png'
    },
    id: 'E2mcHFkwGA-MTJcfl3Abs'
  }
}
