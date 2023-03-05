package com.bumble.bee.app.convertors;

import com.bumble.bee.app.models.dao.Brand;
import com.bumble.bee.app.models.dto.BrandDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BrandMapper extends IConverter<Long, BrandDto, Brand> {

    @Override
    BrandDto toDto(Brand entity);

    @Mapping(target = "id", ignore = true)
    @Override
    Brand toEntity(BrandDto dto);
}
