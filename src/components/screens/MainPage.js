import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { apiCall } from "../../axiosConfig";
import Header from "../includes/Header";

function MainPage() {
    const [locations, setLocations] = useState([]);
    const getLocation = () => {
        axios
            .get(`http://127.0.0.1:8001/api/v1/books/`)
            .then(function (response) {
                console.log(response);
                setLocations(response.data.data);
            }, []);
    };
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <Helmet>
                <title>Places | Books Travel</title>
            </Helmet>
            <Header />
            <BodyContainer>
                <SubContainer>
                    <SubHeading>Shop the Dreams</SubHeading>
                    <SubText>Books For You</SubText>
                </SubContainer>
            </BodyContainer>
            <PlaceContainer>
                {locations.map((place) => (
                    <Link to={`/subpage/${place.id}`} key={place.id}>
                        <Books>
                            <BooksImage>
                                <BooksImg src={place.featured_image} />
                            </BooksImage>
                            <BooksName>{place.name}</BooksName>
                        </Books>
                    </Link>
                ))}
            </PlaceContainer>
        </>
    );
}

export default MainPage;

const BodyContainer = styled.div`
    padding: 20px 60px;
    margin-bottom: 20px;
`;
const SubContainer = styled.div``;
const SubHeading = styled.h2`
    font-size: 40px;
    margin-bottom: 20px;
`;
const SubText = styled.h3`
    color: #000;
    font-size: 20px;
`;
const PlaceContainer = styled.ul`
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const Books = styled.li``;
const BooksImage = styled.div`
    width: 320px;
`;
const BooksImg = styled.img`
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    margin-bottom: 10px;
`;
const BooksName = styled.h3`
    font-size: 18px;
    margin-bottom: 10px;
`;
const Location = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`;
const LocationLogo = styled.div`
    width: 15px;
    margin-right: 10px;
`;
const LocationImg = styled.img`
    width: 100%;
    display: block;
`;
const LocationName = styled.h4`
    font-size: 18px;
    font-weight: 300;
`;
