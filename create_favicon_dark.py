from PIL import Image

# Crear favicon-256 con fondo oscuro
img = Image.open('public/icon.png')
if img.mode != 'RGBA':
    img = img.convert('RGBA')

img.thumbnail((int(256 * 0.9), int(256 * 0.9)), Image.Resampling.LANCZOS)
background = Image.new('RGB', (256, 256), (15, 23, 42))  # slate-950
offset = ((256 - img.width) // 2, (256 - img.height) // 2)
background.paste(img, offset, img)
background = background.convert('RGBA')
background.save('public/favicon-dark-256.png', 'PNG')
print('✓ favicon-dark-256.png creado')
