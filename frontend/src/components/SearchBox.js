import React from 'react'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
const navigate = useNavigate();
const [query, setQuery] = useState('') 

const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search')
}

  return (
    <Form className='d-flex me-auto py-2' onSubmit={submitHandler}>
    <InputGroup>
    <FormControl
    type="text"
    name="q"
    id="q"
    placeholder="search products..."
    aria-label="Search Products"
    aria-describedby="button-search"
    onChange={(e) => setQuery(e.target.value)}
    >

    </FormControl>
    <Button variant="outline-primary" type="submit" id="button-search">
        <i className="fas fa-search"></i>
    </Button>
    </InputGroup>
    </Form>
  )
}

export default SearchBox