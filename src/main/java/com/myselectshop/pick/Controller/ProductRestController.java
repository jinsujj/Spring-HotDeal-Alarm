package com.myselectshop.pick.Controller;

import com.myselectshop.pick.Model.Product;
import com.myselectshop.pick.Model.ProductMypriceRequestDto;
import com.myselectshop.pick.Model.ProductRepository;
import com.myselectshop.pick.Model.ProductRequestDto;
import com.myselectshop.pick.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProductRestController {

    private final ProductRepository productRepository;
    private final ProductService productService;

    @GetMapping("/api/products")
    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    // 모아보기 등록
    @PostMapping("/api/products")
    public Product createProduct(@RequestBody ProductRequestDto productRequestDto){
        Product product = new Product(productRequestDto);
        return productRepository.save(product);
    }

    // 개인 가격 설정
    @PutMapping("/api/products/{id}")
    public Long updateProduct(@PathVariable Long id, @RequestBody ProductMypriceRequestDto productMypriceRequestDto){
           return productService.update(id, productMypriceRequestDto);
    }

    // 모아보기 품목 삭제
    @DeleteMapping("/api/delete/{id}")
    public Long deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);

        System.out.println(id);
        return id;
    }
}
