
<div align="center">
  <img src="./img/로고.PNG" width="50%"/>
</div>

<hr>

# 1. 주요 기능 시연 영상

<div align="center">
  <img src="./img/시뮬레이션시연영상.gif" width="100%"/>
</div>

# 2. :calendar: 프로젝트 기간 

#### 23.07.10 ~ 23.08.18 (6주)

# 3. 개발 팀원 소개

|                  이은경                   |                      김서영                       |               김현수                |               이수연                |               이준용               |                    정동교                     |
| :---------------------------------------: | :-----------------------------------------------: | :---------------------------------: | :---------------------------------: | :--------------------------------: | :-------------------------------------------: |
|    <img src="assets/team/앙경.jpg" width="120" height="150" >     |        <img src="assets/team/더영.jpg" width="120" height="150">         | <img src="assets/team/기멘수.jpg" width="120" height="150">  | <img src="assets/team/수염.jpg" width="120" height="150">  | <img src="assets/team/뽀용.jpg" width="120" height="150"> |      <img src="assets/team/교동.png" width="120" height="150">       |
|                 팀장(BE)                  |                     팀원(FE)                      |              팀원(BE)               |              팀원(FE)               |              팀원(BE)              |                   팀원(BE/FE)                    |
| [rileyleee](https://github.com/rileyleee) | [ksykma](https://github.com/ksykma) | [footdev](https://github.com/footdev) | [bagoye](https://github.com/bagoye) | [elle6044](https://github.com/elle6044)  | [dngyj](https://github.com/dngyj) |


# 4. 데려가개 소개

### 1) 프로젝트 소개

반려견 양육 시뮬레이션과 입양 프로세스 개선을 통한 무분별한 입양 방지 및 성숙한 입양 문화 도모 위한 서비스 

1. 반려견 양육 시뮬레이션 기능
2. 입양 강아지의 특성과 입양 예정자의 특성을 고려한 매칭 서비스 기능
3. 분양자와 입양자 간 실시간 스트리밍 서비스 기능


### 2) 기획 배경

반려인이 증가하는 요즘, 반려동물을 유기하거나 파양하는 경우도 증가하고 있음
E1I5팀은 문제의 주 원인이 낮은 입양 만족도에 있다고 판단했고, 분석한 낮은 입양 만족도의 원인은 다음과 같음

    - 기저원인1: 금액만 지불하면 입양할 수 있는 손 쉬운 입양 방식
    - 기저원인2: 본인의 생활 방식 및 주거 여건 등을 충분히 고려하지 않음
    - 기저원인3: 입양 대상 강아지를 충분히 파악하지 못함

위 원인을 해결하기 위한 방안으로 상호간 책임비을 통한 분양 시스템 표준화, 입양자의 여건 파악을 위한 사전테스트와 시뮬레이션, 입양 시 고려해야 할 정보 파악을 위한 설문 조사 기능을 구현함.

### 3) UCC

[데려가개 프로젝트 소개 UCC 보러가기](https://www.youtube.com/watch?v=6YuD0F-pH_E)

# 5. 주요 기능 소개

### 1) 반려견 양육 시뮬레이션

### 2) 사전 테스트

### 3) 선호도 조사

### 4) 입양 게시판

### 5) 보호자와 상담(채팅 및 화상)

### 6) 책임비 납부 및 반환

# 6. 주요 기술 스택 소개

<img src="assets/skill/주요기술스택.PNG"> 

# 7. 서비스 아키텍처

<img src="assets/skill/시스템아키텍처.PNG"> 


# 8. 주요 기획 및 설계 자료

#### | [요구사항정의서](https://docs.google.com/spreadsheets/d/1Uqf0YmFeVwYuZPWYLiKWIPeZA8cFOR7hSE0o8xM8RLo/edit#gid=0) | [사용자스토리](https://docs.google.com/spreadsheets/d/1AOAkrt0WQE_8c0uHmOPhKNq8UcjX5U-gLw8P4L1d1dc/edit#gid=0) | [ERD](https://www.erdcloud.com/d/JZdkyKFKmvn88mqBG) | [와이어프레임](https://www.figma.com/file/JjoMiub1PyJ7eyNGYR8V0Z/E1I5-%EA%BC%AC%EC%88%9C%EB%82%B4?type=design&node-id=0-1&mode=design&t=aXh5UjBfkJRemuwG-0) | [API설계서](https://documenter.getpostman.com/view/27233223/2s9YBxZbXu#intro) |


# 9. 프로젝트 파일 구조

### BackEnd

```
📦Back
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂kkosunnae
 ┃ ┃ ┃ ┃ ┃ ┗ 📂deryeogage
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂adopt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cost
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mission
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂pretest
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂simulation
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂survey
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂custom
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂handler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂interceptor
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂s3file
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DeryeogageApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂kkosunnae
 ┃ ┃ ┃ ┃ ┃ ┗ 📂deryeogage
```

### FrontEnd
```
📦Front
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂1
 ┃ ┃ ┣ 📂2
 ┃ ┃ ┣ 📂3
 ┃ ┃ ┣ 📂4
 ┃ ┃ ┣ 📂5
 ┃ ┃ ┣ 📂adopt
 ┃ ┃ ┣ 📂background
 ┃ ┃ ┣ 📂chatimg
 ┃ ┃ ┣ 📂dog_bgi
 ┃ ┃ ┣ 📂emotion
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂requirement
 ┃ ┃ ┣ 📂rundogs
 ┃ ┃ ┣ 📂things
 ┃ ┃ ┣ 📂training
 ┃ ┣ 📂audio
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂Radio
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂ChatVideo
 ┃ ┃ ┃ ┣ 📂openvidu
 ┃ ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📂toolbar
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂NotFound
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
 ┃ ┣ 📂recoil
 ┃ ┣ 📂styled
 ┃ ┃ ┣ 📂Adopt
 ┃ ┃ ┣ 📂ChatVideo
 ┃ ┃ ┣ 📂Check
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂User
```
