import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message.jsx'
import Loader from '../../components/Loader.jsx';
import FormContainer from '../../components/FormContainer.jsx';
import { toast } from 'react-toastify';
import { useUpdateUserMutation, useGetUserDetailsQuery } from "../../slices/usersApiSlice.js";

const UserEditScreen = () => {
    const{ id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {data: user, isLoading, refetch, error} = useGetUserDetailsQuery(userId);

    const [updateUser, {isLoading: loadingUpdateUser}] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
          await updateUser({userId, name, email, isAdmin});
          toast.success('User updated successfully');
          refetch();
          navigate('/admin/userlist')
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdateUser && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='isAdmin'>
                        <Form.Check
                            type="checkbox"
                            label = 'Is Admin'
                            checked={isAdmin}
                            onChange={(e)=> setIsAdmin(e.target.value)}
                        ></Form.Check>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        className="my-2"
                    >
                        UPDATE
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen;