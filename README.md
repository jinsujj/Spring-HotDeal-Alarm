# pick-It-Up
Spring boot를 공부하기 위해 만든 최저가 알리미 사이트입니다 <br/>
단순 공부용으로 만든 것으로, 로그인 및 계정 별로 관리하는 기능은 따로 추가하지 않았습니다. 


> 프로젝트 간략 소개 한 문장 
- http://jinsu-seoul.iptime.org/
- Spring boot Framework 로 만든 최저가 알리미.
- Java, JS, Spring, AWS(MySQL-RDS, Linux)

## 핵심 기능  Key Feature
- 모아보기, 탐색하기 탭으로 구성 

### 탐색하기 탭         
 1. 네이버 쇼핑 API 통한 상품 목록 조회(GET)
 2. 선택한 상품 저장(POST)
 3. 선택한 상품 지정가 설정(UPDATE)
 
### 모아보기 탭
 1. 저장한 상품의 현재가 및 지정가 조회
 2. 상품 이미지 클릭시 Link 로 이동
 3. 지정가가 현재가보다 낮을시 최저가 문구 발생
 4. 저장한 상품 삭제(DELETE)
 
 ### Common 기능
 1. 스케줄링으로 매일 01시 저장한 상품 가격 비교 

## Contributing
*(프로젝트 기여자가 있을 경우 적습니다)*
- Thanks to @기여자이름

## Reference

## Links
- pickitup.shop

## License


### Setting
```
#### 실행
nohup java -jar JAR_name.jar & 

#### ps 동작 확인
ps -ef | grep java

#### ps (pid) 삭제
kill -9 [pid]
```

