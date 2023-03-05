package com.bumble.bee.app.convertors;

import com.bumble.bee.app.models.dao.ProductCategory;
import com.bumble.bee.app.models.dto.ProductCategoryDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductCategoryMapper extends IConverter<ProductCategoryDto, ProductCategory> {

    @Override
    ProductCategoryDto toDto(ProductCategory entity);

    @Override
    ProductCategory toEntity(ProductCategoryDto dto);
}
