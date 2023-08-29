import Carousel from "react-bootstrap/Carousel";
export default function Carasol() {
  return (
    <div style={{ width: "fit-content", margin: "0 auto", color: "black" }}>
      <Carousel data-bs-theme="dark">
        <Carousel.Item interval={1000}>
          <div
            style={{
              width: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg?w=2000"
              width="100%"
              alt="first"
            />
          </div>
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>First slide label</h3>
            <p style={{ color: "black" }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div style={{ width: "100vh" }}>
            <img
              src="https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg?w=2000"
              width="100%"
              alt="first"
            />
          </div>
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>Second slide label</h3>
            <p style={{ color: "black" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ width: "100vh" }}>
            <img
              src="https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg?w=2000"
              width="100%"
              alt="first"
            />
          </div>
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>Third slide label</h3>
            <p style={{ color: "black" }}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
