import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { apiCall } from "../../axiosConfig";
import Header from "../includes/Header";
import { UserContext } from "../../App";

function SubPage() {
    const { id } = useParams();
    const [place, setPlace] = useState({
        name: "",
        gallery: [],
    });

    const { userData } = useContext(UserContext);

    useEffect(() => {
        // console.log(userData);

        axios
            .get(`http://127.0.0.1:8001/api/v1/books/view/${id}`, {
                headers: { Authorization: `Bearer ${userData?.access}` },
            })
            .then((response) => setPlace(response.data.data));
    }, [id]);

    return (
        <>
            <Helmet>
                <title>{`${place.name} | Mokee Travel`}</title>
            </Helmet>
            <Header />
            <ViewPage>
                <Heading>{place.name}</Heading>
                <SubHeading>
                    <DivLeft>{place.category_name}</DivLeft>
                    <DivRight>
                        <PlaceLogo>
                            <LogoImg
                                src={
                                    require("../../assets/images/place.svg")
                                        .default
                                }
                            />
                        </PlaceLogo>
                        <LocationName>{place.location}</LocationName>
                    </DivRight>
                </SubHeading>
                <ImageContainer>
                    <MainImage>
                        <MainImg src={place.image} />
                    </MainImage>
                    <Gallery>
                        {place.gallery.map((photos) => (
                            <GalleryImage key={photos.id}>
                                <GalleryImg src={photos.image} />
                            </GalleryImage>
                        ))}
                    </Gallery>
                </ImageContainer>
                <DetailsContainer>
                    <DetailsHeading>Place Details</DetailsHeading>
                    <Description>{place.description}</Description>
                </DetailsContainer>
            </ViewPage>
        </>
    );
}

export default SubPage;

const ViewPage = styled.div`
    width: 75%;
    margin: 0 auto;
`;
const Heading = styled.h1`
    font-size: 50px;
    margin-bottom: 15px;
`;
const SubHeading = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const DivLeft = styled.h3`
    padding: 5px 10px;
    font-size: 20px;
    border: 2px solid #cbcbcb;
    border-radius: 50px;
    color: #a4a4a4;
    font-weight: 300;
    margin-right: 17px;
`;
const DivRight = styled.div`
    display: flex;
    align-items: center;
`;
const PlaceLogo = styled.div`
    width: 15px;
    margin-right: 5px;
`;
const LogoImg = styled.img`
    width: 100%;
    display: block;
`;
const LocationName = styled.h3`
    color: #a5a5a5;
    font-size: 18px;
`;

const ImageContainer = styled.div`
    display: flex;
    margin-bottom: 30px;
`;
const MainImage = styled.div`
    width: 45%;
    margin-right: 20px;
`;
const MainImg = styled.img`
    width: 100%;
    display: block;
    border-top-left-radius: 15px;
`;
const Gallery = styled.ul`
    width: 46%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const GalleryImage = styled.li`
    width: 250px;
    margin-bottom: 20px;
    &:nth-child(2) {
        img {
            border-top-right-radius: 15px;
        }
    }
    &:nth-child(4) {
        img {
            border-bottom-right-radius: 15px;
        }
    }
`;
const GalleryImg = styled.img`
    width: 100%;
    display: block;
`;

const DetailsContainer = styled.div``;
const DetailsHeading = styled.h1`
    font-size: 30px;
    margin-bottom: 25px;
`;
const Description = styled.p`
    color: #676767;
    font-size: 18px;
`;
