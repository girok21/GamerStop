import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/SearchBox.style.scss';

const SearchBox = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useNavigate();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }

    const formStyleObj = {
        width: 'calc(100vw - 500px)',
        height: '90px',
        borderRadius: '0px',
        border: 0,
        placeholder : 'red',
        outline: 'none',
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e)=> setKeyword(e.target.value)}
                value={keyword}
                placeholder='SEARCH'
                className='mr-sm-2 ml-sm-5 search-box'
                style={formStyleObj}
            ></Form.Control>
        </Form>
    )
}

export default SearchBox;