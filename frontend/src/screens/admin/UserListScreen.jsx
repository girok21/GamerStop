import { LinkContainer } from 'react-router-bootstrap' 
import { Table, Button } from 'react-bootstrap' 
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice.js';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'

const UserListScreen = () => {
  const {data: users, refetch,  isLoading, error} = useGetUsersQuery();
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
  
  const deleteHandler = async (userId) => {
    if(window.confirm('Are you sure?')){
      try {
        await deleteUser(userId);
        toast.success('User Deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  console.log(users)
  return (
    <>
      <h1 style={{margin:'25px'}}>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (<Loader/>) : error ? (
        <Message variant='danger'>{error}</Message>
      ):(
        <Table striped bordered hover responsive className='table-sm' style={{width:'95%', marginLeft:'auto', marginRight:'auto'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{color:'green'}}/>
                  ):(<FaTimes style={{color:'red'}}/>)}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant = 'danger' 
                    className='btn-sm'
                    onClick={()=> deleteHandler(user._id)}
                  >
                    <FaTrash style={{color: 'white'}}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen;