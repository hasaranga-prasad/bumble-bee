package com.bumble.bee.app.convertors;

import com.bumble.bee.app.models.dao.Entity;
import com.bumble.bee.app.models.dto.Dto;

public interface IConverter<DTO extends Dto, ENTITY extends Entity> {

    DTO toDto(ENTITY entity);

    ENTITY toEntity(DTO dto);
}
