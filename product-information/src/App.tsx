import 'bootstrap/dist/css/bootstrap.min.css'
import { ProductForm } from "./components/ProductForm"
import { Container } from 'react-bootstrap'


export default function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <ProductForm />
    </Container>
  )
}

