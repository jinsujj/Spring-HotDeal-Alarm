let targetId;

$(document).ready(function (){
    $('#search-result-box').empty();

    $('#query').on('keypress', function (e){
        if(e.key == 'Enter'){
            execSearch();
        }
    });

    $('#close').on('click', function (){
        $('#container').removeClass('active');
    });

    $('.nav div.nav-see').on('click',function (){
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
    });

    $('.nav div.nav-search').on('click', function(){
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
    })
    $('#see-area').show();
    $('#search-area').hide();

    showProduct();
})

//검색 값 조회
function execSearch(){
        let query = $('#query').val();
        if(query == ''){
            alert("검색어를 입력해 주세요");
            $('#query').focus();
            return;
        }

    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            $('#search-result-box').empty();
            for (let i = 0; i < response.length; i++) {
                let itemDto = response[i];
                let tempHtml = addHTML(itemDto);
                $('#search-result-box').append(tempHtml);
            }
        }
    })
}

// 조회한 상품 출력
function addHTML(itemDto){
    return `<div class="search-itemDto">
                <div class="search-itemDto-header">
                    <img src="${itemDto.image}" alt="">
                </div>
                <div class="search-itemDto-center">
                    <div style="width: 99%; text-align: center;" >${itemDto.title}</div>
                    <div class="price"> 
                        ${numberWithCommas(itemDto.lprice)}
                        <span class="unit">원</span>
                    </div>
                </div>
                <div class="search-itemDto-below">
                    <img src="images/icon-save.png"  alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
                </div>
            </div>`
}

// 저장하기  String 형태로 저장
function addProduct(itemDto){
    $.ajax({
        type: "POST",
        url: "/api/products",
        data: JSON.stringify(itemDto),
        contentType: "application/json",
        success: function (response) {
            $('#container').addClass('active');
            targetId = response.id;
        }
    });
}

/////////////// 모아보기 List Get
function showProduct(){
    $.ajax({
        type: 'GET',
        url: '/api/products',
        success: function (response) {
            // 2. 관심상품 목록, 검색결과 목록 비우기
            $('#product-container').empty();
            $('#search-result-box').empty();
            // 3. for 문마다 관심 상품 HTML 만들어서 관심상품 목록에 붙이기!
            for (let i = 0; i < response.length; i++) {
                let product = response[i];
                let tempHtml = addProductItem(product);
                $('#product-container').append(tempHtml);
            }
        }
    })
}

//모아보기 List 출력
function addProductItem(product){
    return `<div class="product-card">
            <div class="card-header">
                <img src="${product.image}" style="max-width: 300px;" 
                onclick="openInNewTab('${product.link}')"/>
            </div>
            <div class="card-body">
                <div class="title">
                    ${product.title}
                </div>
                <div class="lprice">
                    현재가: <span>${numberWithCommas(product.lprice)}</span>원
                </div>
                <div class="myprice">
                    지정가: <span> ${numberWithCommas(product.myprice)}</span>원
                </div>
                <div style="text-align: right;">
                    <img src="images/icon-delete.png" height="25" alt="" onclick='deleteProduct(${JSON.stringify(product.id)})'>
                </div>
                <div class="isgood ${product.lprice > product.myprice ? 'none' : ''}">
                    최저가
                </div>
            </div>
        </div>`;
}

// 삭제하기
function deleteProduct(targetId){
    $.ajax({
        type:"DELETE",
        url:`/api/delete/${targetId}`,
        success: function (response){
            alert("삭제 되었습니다.");
            window.location.reload();
        },
        error:function(request,status,error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    })
}

function setMyprice() {
    let myprice = $("#myprice").val();

    myprice = myprice.replace(',', '');
    if (myprice == '') {
        alert("올바른 가격을 입력해 주세요");
        return;
    }
    console.log(myprice);
    $.ajax({
        type: "PUT",
        url: `/api/products/${targetId}`,
        contentType: "application/json",
        data: JSON.stringify({myprice: myprice}),
        success: function (response) {
            // 4. 모달을 종료한다. $('#container').removeClass('active');
            $('#container').removeClass('active');
            // 5. 성공적으로 등록되었음을 알리는 alert를 띄운다.
            alert('성공적으로 등록되었습니다.');
            // 6. 창을 새로고침한다. window.location.reload();
            window.location.reload();
        }
    });
}

function openInNewTab(url){
    let win = window.open(url,'_blank');
    win.focus();
}

// 가격 정규식 처리
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}