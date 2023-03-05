package com.bumble.bee.app.models.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Data
@jakarta.persistence.Entity
@Table(name = "brand")
public class Brand implements Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 64)
    private String name;

    @Column(length = 512)
    private String description;

    @OneToMany(mappedBy = "brand")
    private Collection<Product> products;

    @Override
    public String getEntityName() {
        return "Brand";
    }
}
