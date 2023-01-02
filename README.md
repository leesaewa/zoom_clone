# zoom clone

# Preview
<img src="https://user-images.githubusercontent.com/97646713/210237215-bd21bbf0-be00-43ea-ba06-c11b8d62e409.jpg">

## ...basic

### socket.io로 화상통화 구현

- 양방향 통화 가능.
- 두 명이 찼을 때 접속을 시도한 사람을 접속하지 못하게 차단.

- server.js -> express server
- views/home.pug -> pug frontend
- public/js/app.js -> frontend js

### Result

https://codesandbox.io/s/socketio-starter-forked-hvwni2

### 과제(시도하고 싶은 것)

- datachannel로 채팅 구현하기.
- 전체화면
- 화면 공유

---

## ...[chat]

### socket.io로 채팅 구현

- server[chat].js ->
- views/home[chat].pug
- public/js/app[chat].js

---

## ...[no_socket.io]

### websocket으로 구현

- server[no_socket.io].js
- views/home[no_socket.io].pug
- public/js/app[no_socket.io].js
