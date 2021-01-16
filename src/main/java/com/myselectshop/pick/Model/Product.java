package com.myselectshop.pick.Model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;


@Getter
@RequiredArgsConstructor
@Entity
public class Product extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String link;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private int lprice;
    @Column(nullable = false)
    private int myprice;

    public Product(ProductRequestDto productRequestDto){
        this.title = productRequestDto.getTitle();
        this.image = productRequestDto.getImage();
        this.lprice = productRequestDto.getLprice();
        this.link = productRequestDto.getLink();
        this.myprice= 0;
    }

    // 사용자가 정한 기준가
    public void update(ProductMypriceRequestDto mypriceRequestDto){
        this.myprice = mypriceRequestDto.getMyprice();
    }

    // 스케줄링에 의한 최저가
    public void updateByItemDto(ItemDto itemDto){
        this.lprice = itemDto.getLprice();
    }
}
