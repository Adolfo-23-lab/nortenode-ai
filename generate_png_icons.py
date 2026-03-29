from PIL import Image
import os

print("📐 Generando variantes PNG de alta resolución...")

# Crear variantes a partir de icon.png
def resize_png(source_file, size, output_filename):
    img = Image.open(source_file)
    
    # Convertir a RGBA si no lo es
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Redimensionar manteniendo aspecto
    img.thumbnail((size, size), Image.Resampling.LANCZOS)
    
    # Crear imagen de fondo transparente del tamaño exacto
    new_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Calcular offset para centrar
    offset = ((size - img.width) // 2, (size - img.height) // 2)
    new_img.paste(img, offset, img)
    
    # Guardar como PNG
    new_img.save(f'public/{output_filename}', 'PNG')
    print(f'✓ {output_filename} ({size}x{size}) creado correctamente')

# Generar todas las variantes a partir de icon.png
resize_png('public/icon.png', 512, 'icon.png')  # Reescribir la original
resize_png('public/icon.png', 512, 'icon-512.png')
resize_png('public/icon.png', 192, 'icon-192.png')

# Generar apple-touch-icon a partir de apple-icon.png
resize_png('public/apple-icon.png', 180, 'apple-touch-icon.png')

# Crear favicon.png a partir de icon.png
resize_png('public/icon.png', 32, 'favicon.png')

print('\n✓ Todas las variantes PNG han sido creadas correctamente')
print('✓ Imágenes listas para ser servidas por Next.js')
