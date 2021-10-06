export const PROPERTIES_TO_INCLUDE = ['id', 'name', 'description', 'src']
export const SCALE_FACTOR = 0.4
export const FONT_SCALE_FACTOR = 0.675

export enum ObjectType {
  STATIC_VECTOR = 'StaticVector',
  STATIC_GROUP = 'StaticGroup',
  DYNAMIC_GROUP = 'DynamicGroup',
  STATIC_PATH = 'StaticPath',
  DYNAMIC_PATH = 'DynamicPath',
  STATIC_IMAGE = 'StaticImage',
  DYNAMIC_IMAGE = 'DynamicImage',
  STATIC_TEXT = 'StaticText',
  DYNAMIC_TEXT = 'DynamicText',
}

export enum ObjectTypeAlt {
  STATIC_IMAGE = 'image:static',
  DYNAMIC_IMAGE = 'image:dynamic',
  TEXTAREA = 'Textarea',
}
