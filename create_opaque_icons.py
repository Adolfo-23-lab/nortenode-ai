from PIL import Image

print("🎨 Creando versiones de iconos PNG con fondo opaco para escritorio...")

def create_opaque_icon(source_file, size, output_filename, bg_color=(255, 255, 255)):
    """Crea icon con fondo opaco"""
    img = Image.open(source_file)
    
    # Convertir a RGBA si no lo es
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Redimensionar manteniendo aspecto
    img.thumbnail((int(size * 0.9), int(size * 0.9)), Image.Resampling.LANCZOS)
    
    # Crear fondo con color especificado
    background = Image.new('RGB', (size, size), bg_color)
    
    # Calcular offset para centrar
    offset = ((size - img.width) // 2, (size - img.height) // 2)
    
    # Pegar imagen con transparencia
    background.paste(img, offset, img)
    
    # Convertir RGB a RGBA y guardar
    background = background.convert('RGBA')
    background.save(f'public/{output_filename}', 'PNG')
    print(f'✓ {output_filename} ({size}x{size}, fondo opaco) creado')

# Crear versión con fondo blanco (para Windows/escritorio)
create_opaque_icon('public/icon.png', 512, 'icon-512-white.png', (255, 255, 255))
create_opaque_icon('public/icon.png', 192, 'icon-192-white.png', (255, 255, 255))

# Crear versión con fondo oscuro (teal oscuro para que pegue con el tema)
create_opaque_icon('public/icon.png', 512, 'icon-512-dark.png', (15, 23, 42))  # slate-950
create_opaque_icon('public/icon.png', 192, 'icon-192-dark.png', (15, 23, 42))

# Crear favicon de 192x192 (más visible que 32x32)
create_opaque_icon('public/icon.png', 192, 'favicon-large.png', (255, 255, 255))
create_opaque_icon('public/icon.png', 256, 'favicon-256.png', (255, 255, 255))

print('\n✓ Todas las versiones opacas han sido creadas')
