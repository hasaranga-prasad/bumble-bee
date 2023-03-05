package com.bumble.bee.app.convertors;

import com.bumble.bee.app.models.dao.Product;
import com.bumble.bee.app.models.dto.ProductDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper extends IConverter<ProductDto, Product> {

    @Override
    ProductDto toDto(Product entity);

    @Override
    Product toEntity(ProductDto dto);
}
