import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NotLogin from "../../components/Adopt/NotLogin";
import NotSurvey from "../../components/Adopt/NotSurvey";
import LoginSurvey from "../../components/Adopt/LoginSurvey";
import DogListItem from "./../../components/Adopt/DogListItem";

function AdoptBoard() {
  const navigate = useNavigate();
  const [adoptData, setAdoptData] = useState([]);
  const [hasSurvey, setHasSurvey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const insertedToken = localStorage.getItem("accessToken");

  const onClick = () => {
    if (!insertedToken) {
      navigate("/login");
    } else {
      navigate("/adopt/create");
    }
  };

  const fetchDogs = async () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/boards/list`);
      setAdoptData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkSurvey = async () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/surveys`, {
        headers: {
          Authorization: `Bearer ${insertedToken}`,
        },
      });
      if (response.data.length > 0) {
        setHasSurvey(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  const dogsArray = Array.isArray(adoptData) ? adoptData : [];

  useEffect(() => {
    fetchDogs();
    checkSurvey();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <>
          <h1>AdoptBoard</h1>
          {insertedToken && !hasSurvey ? <LoginSurvey /> : null}
          {insertedToken && hasSurvey ? <NotSurvey /> : null}
          {!insertedToken ? <NotLogin /> : null}

          <Button onClick={onClick}>글 작성하기</Button>

          {dogsArray.map((dog) => (
            <DogListItem key={dog.id} dog={dog} media={dog.fileList[0]} /> 
          ))}
        </>
      )}
    </div>
  );
}

export default AdoptBoard;

export const Button = styled.button`
  border: none;
  background-color: #ff914d;
  padding: 0.5vw 1vw;
  border-radius: 30px;
  color: white;
  margin-top: 1vw;
  left: 50%;
  transform: translateX(-50%);
  position: relative;

  display: block;
  width: fit-content;
  cursor: pointer;
`;
