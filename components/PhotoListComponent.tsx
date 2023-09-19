import React from "react";
import { css } from "../styled-system/css";
import { styled } from "../panda.config";

const Container = (props) => {
  return (
    <div
      className={css({
        margin: "0 auto",
        padding: "15px",
        maxWidth: "585px",
      })}
    >
      {props.children}
    </div>
  );
};

const Text = styled("h1", {
  color: "$hiContrast",
});

const ImageContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
});

const Image = styled("img", {
  width: "100px",
  height: "auto",
  borderRadius: "$1",
});

const PhotoListComponent = ({ text, photoList }) => {
  return (
    <Container>
      <Text>PhotoListComponent from Panda CSS.</Text>
      <p style={{ margin: "0" }}>text: {text}</p>

      <ul
        className={css({
          padding: "0",
          margin: "0",
          listStyle: "none",
        })}
      >
        {photoList.map((photo) => (
          <div
            className={css({
              listStyle: "none",
            })}
            key={photo.id}
          >
            <ImageContainer>
              <Image src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </ImageContainer>
          </div>
        ))}
      </ul>
    </Container>
  );
};

export default PhotoListComponent;
