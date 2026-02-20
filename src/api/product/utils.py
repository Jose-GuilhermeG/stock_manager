def get_product_image_path(instance , filename : str) -> str:
    return f"products/{instance.product.pk}/{filename}"