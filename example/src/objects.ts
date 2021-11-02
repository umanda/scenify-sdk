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
  }
}
