import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = ()=> {
    const { id: orderId } = useParams();

    const {data:order, refetch, isLoading, isError} = useGetOrderDetailsQuery();
    console.log(orderId, order);

    return(
        <div>OrderScreen</div>
    )
}

export default OrderScreen;