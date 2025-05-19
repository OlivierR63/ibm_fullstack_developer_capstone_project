import React, { useState, useEffect, useCallback } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
    const [dealersList, setDealersList] = useState([]);
    const [states, setStates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalDealers, setOriginalDealers] = useState([]);

    const dealer_url ="/djangoapp/get_dealers";

    // Function for handling changes in search input
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const filtered = originalDealers.filter(dealer =>
            dealer.state.toLowerCase().includes(query.toLowerCase())
          );
        setDealersList(filtered);
    };

    // Function to manage the loss of focus of the search input
    const handleLostFocus = () =>{
        if (!searchQuery){
            setDealersList(originalDealers);
        }
    };

    // Function to retrieve dealers from the API
    const get_dealers = useCallback(async ()=>{
        const res = await fetch(dealer_url, {method: "GET"});
        const retobj = await res.json();

        if(retobj.status === 200) {
            const all_dealers = Array.from(retobj.dealers);
            const states = Array.from(new Set(all_dealers.map(dealer=>dealer.state)));

            setStates(states);
            setDealersList(all_dealers)
            setOriginalDealers(all_dealers);
        }
    }, [dealer_url]);
    
    useEffect(() => {
        get_dealers();
    },[get_dealers]);  

    const isLoggedIn = sessionStorage.getItem("username") != null;

    return(
    <div>
        <Header/>

        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Dealer Name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Zip</th>
                    <th>
                        <input type="text"
                                placeholder="Search states..."
                                onChange={handleInputChange}
                                onBlur={handleLostFocus}
                                value={searchQuery}
                                />       
                    </th>
                    {
                        isLoggedIn && (
                            <th>Review Dealer</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {dealersList.map(dealer => (
                    <tr key={dealer.id}>
                        <td>{dealer.id}</td>
                        <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
                        <td>{dealer.city}</td>
                        <td>{dealer.address}</td>
                        <td>{dealer.zip}</td>
                        <td>{dealer.state}</td>
                        {
                            isLoggedIn && (
                                <td>
                                    <a href={`/postreview/${dealer.id}`}>
                                        <img src={review_icon} className="review_icon" alt="Post Review"/>
                                    </a>
                                </td>
                            )
                        }
                    </tr>
                ))}
            </tbody>
        </table>;
    </div>
    )
}

export default Dealers
