package com.bumble.bee.app.service.product;

import com.bumble.bee.app.models.dao.Product;
import com.bumble.bee.app.repository.ProductRepository;
import com.bumble.bee.app.service.AbstractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProductServiceImpl extends AbstractService<Product, Long> implements ProductService {

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }

    @Override
    protected Class<Product> getEntityClass() {
        return Product.class;
    }
}
