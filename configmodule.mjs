//region exposedProperties
export const cli = {
    name: ""
}
export const loadedAssetsDir = "external-assets"


export const regexExcludeScan = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico|woff|eot|ttf|js|css).*$/i

// export const regexURLDetect = /(https?:\/\/[^\s]+)/g
export const regexURLDetect = /(https?:\/\/)/g

export const relevantOrigins = [
    "https://arcweave.com"
]

export const regexImagePlus = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico).*$/i

export const regexImageURLExact = /(https?):\/\/.*\.(gif|jpe?g|tiff?|png|webp|bmp|svg|ico)$/i

