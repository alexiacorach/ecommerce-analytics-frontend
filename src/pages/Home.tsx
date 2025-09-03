import { Carousel, Card, Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <div className="p-4">
      {/* Carrusel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carrusel.jpg"
            alt="Promo 1"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carrusel1.jpg"
            alt="Promo 2"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/carrusel3.jpg"
            alt="Promo 3"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Cards de promociones */}
      <Container>
        <Row className="mt-4">
      <Col md={4} className="mb-4">
        <Card className="card h-100">
          <Card.Img
            variant="top"
            src="/cardHome1.png"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>Monday & Tuesday </Card.Title>
            <Card.Text>10% off using credit card</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="mb-4">
        <Card className="card h-100">
          <Card.Img
            variant="top"
            src="/cardHome2.jpg"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>Wednesday Special</Card.Title>
            <Card.Text>Buy 2 get 1 free on selected items</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="mb-4">
        <Card className="card h-100">
          <Card.Img
            variant="top"
            src="/cardHome3.jpg"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>Friday Offer</Card.Title>
            <Card.Text>15% off paying with cash</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
      </Container>
    </div>
  );
}
