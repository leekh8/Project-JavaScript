# React.js, Redux, Styled-components를 사용한 모던한 프론트엔드 애플리케이션 구축

0. React 프로젝트 생성

- `npx create-react-app <directory name>`을 통해 `create-react-app` 패키지를 1회성으로 내려 받아 실행

1. 컴포넌트 구조 설계

- 와이어프레임에 기반해 컴포넌트 정의
- 각 컴포넌트가 가진 기능, 어떤 props를 받을 지 정의
- 재사용 가능한 컴포넌트 생성해 코드의 중복 최고화

```
  .
  ├── package.json
  ├── public
  │  ├── index.html
  │  └── manifest.json
  ├── src
  │  ├── App.js
  │  ├── index.js
  │  ├── components
  │  │  └── Editor
  │  │  ├── Toolbar
  │  │  ├── Preview
  │  │  ├── Header
  │  │  ├── Footer
  │  ├── redux
  │  │  ├── actions
  │  │  └── reducers
  │  └── styles
  └── webpack.config.js
```

- `public`
  - 정적 파일
- `src`
  - 리액트 개발을 위한 파일들

1. Redux 스토어 설정

- 상태 관리를 위해 Redux 설정
- 애플리케이션의 상태를 한 곳에서 관리하므로 데이터 흐름을 쉽게 추적, 예측 가능하게 해줌
- `src` 디렉토리 내에 `redux` 디렉토리를 통해 필요한 action, reducer를 정의
- 애플리케이션의 상태 업데이트 로직 관리

3. Styled-components 이용한 스타일링

- 컴포넌트 스코프의 CSS 제공해 컴포넌트의 스타일 캡슐화
- 스타일 충돌 방지, 코드 재사용성 제공
- 각 컴포넌트 파일 내, 해당 컴포넌트의 스타일 정의한 styled component 생성 가능
- 각 컴포넌트의 로직과 스타일이 같은 위치에 있어 유지 관리 용이

4. test를 위한 nodemon 설정

- `package.json` 파일의 `scripts`에 `'dev': 'nodemon -w src -e js,jsx,css --exec \ 'react-scripts start\''` 작성
  - `-w`: `nodemon`이 `src` 디렉토리를 감시하도록 설정
  - `-e`: `nodemon`이 `.js`, `.jsx`, `.css` 파일의 변경을 감시하도록 설정
