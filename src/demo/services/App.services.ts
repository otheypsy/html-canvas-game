const loadJSON = async (url: string): Promise<object> => {
    const response = await fetch(url)
    return await response.json()
}

const loadImage = async (url: string): Promise<HTMLImageElement> => {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
}

export { loadJSON, loadImage }