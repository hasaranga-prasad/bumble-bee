package com.bumble.bee.app.rest.controller;

import com.bumble.bee.app.models.dao.Entity;
import com.bumble.bee.app.models.dto.Dto;
import com.bumble.bee.app.rest.AbstractRestService;

public abstract class AbstractEntityRestController<KEY, DTO extends Dto<KEY>, ENTITY extends Entity> {

    private final AbstractRestService<KEY, DTO, ENTITY> restService;

    public AbstractEntityRestController(AbstractRestService<KEY, DTO, ENTITY> restService) {
        this.restService = restService;
    }
}
