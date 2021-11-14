export const PROPERTIES_TO_INCLUDE = ['id', 'name', 'description', 'src', 'keys', 'keyValues']

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
  ACTIVE_SELECTION = 'activeSelection',
  GROUP = 'group'
}

export enum ObjectTypeAlt {
  STATIC_IMAGE = 'image:static',
  DYNAMIC_IMAGE = 'image:dynamic',
  TEXTAREA = 'Textarea'
}

export const defaultEditorConfig = {
  clipToFrame: true,
  scrollLimit: 200
}
