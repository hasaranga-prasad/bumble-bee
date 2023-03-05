package com.bumble.bee.app.models.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductDto implements Dto<Long> {

    private Long id;
    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @Size(min = 3, max = 512, message = "Description must be between 3 and 512 characters")
    private String description;

    private byte[] image;

    @NotBlank(message = "Price is mandatory")
    @Min(value = 0, message = "Price must be greater than 0")
    private Double price;

    @NotBlank(message = "Category is mandatory")
    private ProductCategoryDto category;

    @NotBlank(message = "Brand is mandatory")
    private BrandDto brand;
}
