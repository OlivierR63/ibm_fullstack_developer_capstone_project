import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';


const SearchCars = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [model, setModel] = useState([]);
    const [dealer, setDealer] = useState({"full_name":""});
    const [message, setMessage] = useState("Loading Cars ...");

    let params = useParams();
    let id = params.id;

    let dealer_url = '/djangoapp/get_inventory/${id}';
    let fetch_url = '/djangoapp/dealer/${id}';
    
}