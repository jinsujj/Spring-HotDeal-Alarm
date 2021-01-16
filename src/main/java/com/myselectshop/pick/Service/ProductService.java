package com.myselectshop.pick.Service;

import com.myselectshop.pick.Model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;


    @Transactional
    public Long update(Long id, ProductMypriceRequestDto productMypriceRequestDto){
        // 개인 가격 설정
         Product product = productRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("아이디가 없습니다.")
        );
        product.update(productMypriceRequestDto);
        return id;
    }

    @Transactional
    public void updateBySearch(Long id, ItemDto itemDto){
        // 모아보기 목록 추가
        Product producct = productRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않는다")
        );

        producct.updateByItemDto(itemDto);
    }

    @Transactional
    public void delete(Long id){
        productRepository.deleteById(id);

    }
}
