export const iconFallbackConfig = {
  image: 'material-symbols:image-outline',
  file: 'material-symbols:description-outline',
  video: 'mdi:videocam-outline',
  contact: 'material-symbols:person-outline',
  audio: 'material-symbols:audio-file-outline',
  location: 'material-symbols:location-on-outline'
}

export const iconFallbackSizeConfig = {
  default: '36px',
  xs: '20px',
  sm: '28px',
  lg: '44px'
}

export const findFallbackIcon = (type: keyof typeof iconFallbackConfig) =>
  iconFallbackConfig[type]
