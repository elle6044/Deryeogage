import React, {  useState, useEffect } from 'react';
import axios from "axios";
import { PiPawPrintFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import {
  SimulationExistAtom,
  SimulationStartAtom
} from "../recoil/SimulationAtom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../styled/Home.style"

function Home() {
  const [existValue, setExistValue] = useRecoilState(SimulationExistAtom);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [startValue, setStartValue] = useRecoilState(SimulationStartAtom)
  useEffect(() => {
    if (existValue !== null) {
        localStorage.setItem('petType', existValue.petType)
        localStorage.setItem('background', existValue.background)
        localStorage.setItem('cost', existValue.cost)
        localStorage.setItem('petName', existValue.petName)
        localStorage.setItem('end', existValue.end)
        localStorage.setItem('endCheck', existValue.endCheck)
        localStorage.setItem('endTime', existValue.endTime)
        localStorage.setItem('id', existValue.id)
        localStorage.setItem('lastTime', existValue.lastTime)
        localStorage.setItem('quizNum', existValue.quizNum)
        localStorage.setItem('requirement', existValue.requirement)
        localStorage.setItem('startTime', existValue.startTime)
        localStorage.setItem('title', existValue.title)
        localStorage.setItem('train', existValue.train)
        localStorage.setItem('user', existValue.user)
        localStorage.setItem('hpPercentage', existValue.health)
    }
  }, [existValue]);
  const handleLinkClick = async (event, page) => {
    getLocationAndWeather();
    if (event) event.preventDefault();
    // 로그인 여부를 확인하여 이동할 페이지 결정
    if (localStorage.getItem("accessToken")) {
      // 로그인되어 있는 경우 해당 페이지로 이동
      const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
      if (page === "/simulations") {
        localStorage.setItem("afterLoginPage", page);
      } else {
        navigate(page);
      }
      if (page === "/simulations") {
        setLoading(true) // 로딩 시작
        try {
          const url = `${REACT_APP_API_URL}/simulations`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const now = new Date()
          const currentHours = now.getHours()
          const currentMinutes = now.getMinutes()
          const simulationData = response.data;
          if (currentHours >= 0 && currentHours < 8) {
            navigate("/nosimulations"); // NoSimulation 페이지로 이동
          } 
          else if (response.data.end === true) {
            navigate("/simulations/end")
          }
          else {
          if (response.data === "Start a new simulation") {
            setStartValue(response.data)
            localStorage.setItem("activatedNum", 1);
            localStorage.setItem('hpPercentage', 100);
            localStorage.setItem('timeDifference', JSON.stringify({ // 객체 데이터 등록할 때 무조건 stringify 활용
              hours:0,
              minutes:0
            }));
          } else {
            setExistValue(simulationData);; // SET하자마자 담기지 않아서 response.data로 해줌
            localStorage.setItem("activatedNum", 5);

            const startTimeHours = Number(simulationData.startTime.substr(11, 2)); // 시작 시간
            const startTimeMinutes = Number(simulationData.startTime.substr(14, 2)); // 시작 분
            const lastTimeHours = Number(simulationData.lastTime.substr(11, 2)); // 최근 접속 시간
            const lastTimeMinutes = Number(simulationData.lastTime.substr(14, 2)); // 최근 접속 분
            
            let diffHours = lastTimeHours - startTimeHours; // 게임을 진행한 시간의 시간
            let diffMinutes = lastTimeMinutes - startTimeMinutes; // 게임을 진행한 시간의 분
            
            if (diffMinutes < 0) { // 분이 0보다 작으면 시간을 1 빼고 분에 60분 더해
              diffHours--;
              diffMinutes += 60;
            }

            if (diffHours < 0) { // 시간이 0보다 작으면 시간에 24시 더해
              diffHours += 24;
            }
            // // 게임에 접속하지 않는동안 체력을 닳게 하기 위해
            // 게임 접속하지 않은 시간 계산 결과
            let hpHours = currentHours - lastTimeHours // 게임을 접속하지 않은 시간의 시간만큼 hp를 줄여야 돼
            let hpMinutes = currentMinutes - lastTimeMinutes // 게임을 접속하지 않은 시간의 분만큼 hp를 줄여야 돼
            if (hpMinutes < 0) {
              hpHours--;
              hpMinutes += 60;
            }

            if (hpHours < 0) {
              hpHours += 24;
            }
            // 
            let Hours = diffHours + hpHours // 게임을 시작한 이후로 지난 시간의 시간
            let Minutes = diffMinutes + hpMinutes // 게임을 시작안 이후로 지난 시간의 분
            if (Minutes >= 60) {
              Hours += 1
              Minutes -= 60
            }
            // 24시간이 넘어가면 24:00으로 고정
            if (Hours >= 24) {
              Hours = 24;
              Minutes = 0;
            }
            
            localStorage.setItem('timeDifference', JSON.stringify({
              hours: Hours,
              minutes: Minutes
            }));
          }
          navigate("/simulations");
        }
        } catch (error) {
          console.log(error);
        }
        setLoading(false) // 로딩 완료
      } else if (page === "/checklist") {
        // 체크리스트 페이지를 선택한 경우
        try {
          const url = `${REACT_APP_API_URL}/pretests`;
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          if (response.data.status === "success") {
            window.location.href = "/checklist/result";
          }
        } catch (error) {
          if (
            error.response.data.data ===
            "사전 테스트 결과 정보가 존재하지 않습니다."
          ) {
            console.log("체크리스트 확인 오류", error.response.data.message);
            window.location.href = "/checklist";
          }
        }
      } else {
        navigate(page);
      }
    } else {
      // 로그인되어 있지 않은 경우 로그인 페이지로 이동
      navigate("/login");
      // 로그인 후에 이동할 페이지 정보를 로컬 스토리지에 저장
      localStorage.setItem("clickedPage", page);
    }
  };

  // 컴포넌트가 렌더링될 때에 로그인 후에 이동할 페이지를 처리
  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const clickedPage = localStorage.getItem("clickedPage");
      const afterLoginPage = localStorage.getItem("afterLoginPage");
  
      if (clickedPage || afterLoginPage) {
        if (!isLoading) {
          // 시뮬레이션 페이지로 이동하려는 경우, handleLinkClick 함수를 호출합니다.
          handleLinkClick(null, clickedPage || afterLoginPage);
        }
      }
  
      localStorage.removeItem("clickedPage");
      localStorage.removeItem("afterLoginPage");
    }
  }, [navigate, isLoading]);

  // 이 부분에 useEffect를 추가합니다.  그래야 업데이트가 잘된다.
  useEffect(() => {
    console.log(existValue);
  }, [existValue]);




  //준 위치/날씨, 동 위치
  //날씨
   // 상태 변수 정의
   const [state, setState] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    desc: '',
    icon: '',
    loading: true,
    lat: null, // 위도
    lon: null, // 경도
  });

  // 컴포넌트 생성 후 날씨 정보 조회
  const getLocationAndWeather = () => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
  
    const getWeather = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const lang = 'kr';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`;
  
      axios
        .get(url)
        .then((responseData) => {
          const data = responseData.data;
          setState({
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            loading: false,
            lat: lat,
            lon: lon,
          });
        })
        .catch((error) => console.log(error));
    };
  
    getLocation();
  }
  

  const imgSrc = `https://openweathermap.org/img/wn/${state.icon}@2x.png`;
  
  localStorage.setItem('humidity', state.desc);
  localStorage.setItem('imgSrc', imgSrc);
  localStorage.setItem('lat', 36.355202);
  localStorage.setItem('lon', 127.298288);

  const [hoverText, setHoverText] = useState('');
  const [textColor, setTextColor] = useState('');

  const texts = [
      '강아지의 새로운 삶의 시작과 소중한 추억을 함께 만들어보세요!',
      '시뮬레이션을 통해 가상으로 강아지를 키워보세요!',
      '선호도 조사를 통해 나의 생활에 맞는 강아지를 찾아보세요!',
      '입양 전 사전테스트를 통해 강아지를 키울 준비가 되었는지 확인해보세요!'
  ];

  const colors = ['#FF9DE9', '#9A5BFF', '#6B9C5A', '#738BDD'];

  const handleMouseEnter = (index) => {
      setHoverText(texts[index]);
      setTextColor(colors[index]);
  };

  const handleMouseLeave = () => {
      setHoverText('');
      setTextColor('');
  };

  return (
    <S.MainContainer className="row">
      <S.HomeContainer>
        <S.Main>
        <S.Span>데려가개</S.Span>
        </S.Main>
        <S.Text>
          데려가개는 강아지들의 <S.Span>행복한 미래</S.Span>를 최우선으로 성숙한
          반려문화를 도모합니다.
        </S.Text>
        <S.Text className='text'>
          소중한 생명인 강아지와 오랜시간 함께할 <S.Span>인연</S.Span>을 만듭니다.
        </S.Text>
        <S.pTag style={{color: textColor}} show={hoverText.length > 0}>
          {hoverText}
        </S.pTag>
        <S.RowWrap className='d-flex justify-content-between align-items-center'>
        <S.ImgDiv className='text-center'>
          <S.ImgBtn className='adopt'
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={(event) => handleLinkClick(event, "/adopt")}
              />
            <S.Name className='pink'>입양게시판</S.Name>
          </S.ImgDiv>
          <S.ImgDiv className='text-center'>
              <S.ImgBtn className='simulation'
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={(event) => handleLinkClick(event, "/simulations")}
              />
            <S.Name className='purple'>시뮬레이션</S.Name>
          </S.ImgDiv>
          <S.ImgDiv className='text-center'>
              <S.ImgBtn className='survey'
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={(event) => handleLinkClick(event, "/survey")}
              />
            <S.Name className='green'>선호도조사</S.Name>
          </S.ImgDiv>
          <S.ImgDiv className='text-center'>
              <S.ImgBtn className='checklist'
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onClick={(event) => handleLinkClick(event, "/checklist")}
              />
            <S.Name className='blue'>사전테스트</S.Name>
          </S.ImgDiv>
        </S.RowWrap>
      </S.HomeContainer>
  </S.MainContainer>
  );
}

export default Home;

