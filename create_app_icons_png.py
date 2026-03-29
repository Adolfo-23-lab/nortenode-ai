from PIL import Image
import shutil
import os

# Copiar apple-icon.png e icon.png a public/
print("📋 Copiando imágenes PNG de alta resolución a public/...")
shutil.copy('src/app/apple-icon.png', 'public/apple-icon.png')
shutil.copy('src/app/icon.png', 'public/icon.png')
print("✓ Imágenes copiadas a public/")

# Crear variantes PNG redimensionadas manteniendo transparencia
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

# Crear variantes a partir de icon.png (la más grande)
print("\n📐 Generando variantes PNG redimensionadas...")
resize_png('public/icon.png', 512, 'icon-512.png')
resize_png('public/icon.png', 192, 'icon-192.png')
resize_png('public/apple-icon.png', 180, 'apple-touch-icon.png')

print('\n✓ Todas las imágenes PNG han sido procesadas correctamente')
print('\n🧹 Limpieza de archivos JPEG antiguos...')

# Eliminar JPEG antiguos
jpeg_files = ['public/icon.jpg', 'public/icon-192.jpg', 'public/apple-icon.jpg', 'public/apple-touch-icon.jpg']
for file in jpeg_files:
    if os.path.exists(file):
        os.remove(file)
        print(f'✓ Eliminado: {file}')

print('\n✅ Proceso completado')
