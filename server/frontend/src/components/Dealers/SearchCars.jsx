import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';


const SearchCars = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [model, setModels] = useState([]);
    const [dealer, setDealer] = useState({"full_name":""});
    const [message, setMessage] = useState("Loading Cars ...");

    let params = useParams();
    let id = params.id;

    let dealer_url = `/djangoapp/get_inventory/${id}`;
    let fetch_url = `/djangoapp/dealer/${id}`;

    const fetchDealer = async () => {
        const res = await fetch(fetch_url, {
            method: "GET"
        });

        const retobj = await res.json;
        if (retobj.status === 200) {
            let dealer = retobj.dealer;
            setDealer({"full_name": dealer[0].full_name});
        }
    };


    const populateMakesAndModels = (cars)=>{
        let tmpmakes = [];
        let tmpmodels = [];
        cars.forEach((car)=>{
            tmpmakes.push(car.make);
            tmpmodels.push(car.model);
        });
        setMakes(Array.from(new Set(tmpmakes)));
        setModels(Array.from(new Set(tmpmodels)));
    };


    const fetchCars = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
        });
        const retobj = await res.json();

        if (retobj.status === 200){
            let cars = Array.from(retobj.cars);
            setCars(cars);
            populateMakesAndModels(cars);
        };
    };


    const setCarsMatchingCriteria = async(matching_cars) => {
        let cars = Array.from(matching_cars);
        console.log(`Numbers of matching cars : ${matching_cars}`);

        let makeIdx = document.getElementById('make').selectedIndex;
        let modelIdx = document.getElementById('model').selectedIndex;
        let yearIdx = document.getElementById('year').selectedIndex;
        let mileageIdx = document.getElementById('mileage').selectedIndex;
        let priceIdx = document.getElementById('price').selectedIndex;

        if (makeIdx !== 0) {
            let currmake = document.getElementById('make').value;
            cars = cars.filter(car => car.make === currmake);
        }

        if (modelIdx !== 0) {
            let currmodel = document.getElementById('model').value;
            cars = cars.filter(car => car.model === currmodel);
            if(cars.length !== 0){
                document.getELementById('make').value = cars[0].make;
            }
        }

        if (yearIdx !== 0){
            let curryear = document.getElementById('year').value;
            cars = cars.filter(car => car.year === curryear);

            if (cars.length !== 0){
                document.getELementById('make').value =cars[0].make;
            }
        }

        if (mileageIdx !== 0){
            let currmileage = parseInt(document.getElementById('mileage').value);

            if(currmileage === 50000){
                cars = cars.filter(car => car.mileage <= currmileage)
            } else if (currmileage === 100000){
                cars = cars.filter(car => car.mileage >50000 && car.mileage <= currmileage);
            } else if (currmileage === 150000){
                cars = cars.filter(car => car.mileage >100000 && car.mileage <= currmileage);
            } else if (currmileage === 200000){
                cars = cars.filter(car => car.mileage >150000 && car.mileage <= currmileage);
            } else {
                cars = cars.filter(car => car.mileage > 200000);
            }
        }

        if (priceIdx !== 0) {
            let currprice = parseInt(document.getElementById('price').value);
            if(currprice === 20000) {
              cars = cars.filter(car => car.price <= currprice);
            } else if (currprice === 40000){
              cars = cars.filter(car => car.price <= currprice && car.price > 20000);
            } else if (currprice === 60000){
              cars = cars.filter(car => car.price <= currprice && car.price > 40000);
            } else if (currprice === 80000){
              cars = cars.filter(car => car.price <= currprice && car.price > 60000);
            } else {
              cars = cars.filter(car => car.price > 80000);
            }
        }

        if (cars.length === 0){
            setMessage("No cars found matching criteria");
        }

        setCars(cars);
    };


    let SearchCarsByMake = async () => {
        let make = document.getElementById('make').value;
        dealer_url = dealer_url + "?make=" + make;

        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });

        const retobj = await res.json();
        
        if(retobj.status === 200){
            setCarsMatchingCriteria(retobj.cars);
        }
    };


    let SearchCarsByModel = async () => {
        let model = document.getElementById('model').value;
        dealer_url = dealer_url + "?model=" + model;

        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });

        const retobj = await res.json();
        
        if(retobj.status === 200){
            setCarsMatchingCriteria(retobj.cars);
        }
    };


    let SearchCarsByYear = async () => {
        let year = document.getElementById('year').value;
        dealer_url = dealer_url + "?year=" + year;

        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });

        const retobj = await res.json();
        
        if(retobj.status === 200){
            setCarsMatchingCriteria(retobj.cars);
        }
    };


    let SearchCarsByMileage = async () => {
        let mileage = document.getElementById('mileage').value;
        dealer_url = dealer_url + "?mileage=" + mileage;

        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });

        const retobj = await res.json();
        
        if(retobj.status === 200){
            setCarsMatchingCriteria(retobj.cars);
        }
    };


    let SearchCarsByPrice = async () => {
        let price = document.getElementById('price').value;
        dealer_url = dealer_url + "?price=" + price;

        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        });

        const retobj = await res.json();
        
        if(retobj.status === 200){
            setCarsMatchingCriteria(retobj.cars);
        }
    };

    const reset = () =>{
        const selectElements = document.querySelectorAll('select');

        selectElements.forEach(select => {
            select.selectedIndex = 0;
        });

        fetchCars();
    }


    useEffect(() => {
        fetchCars();
        fetchDealer();
    }, []);

    return(
        <div>
            <Header />
            <h1 style={{ marginBottom: '20px'}}>Cars at {dealer.full_name}</h1>
            <div>
                <span style={
                                { 
                                    marginLeft: '10px',
                                    paddingLeft: '10px'
                                }
                            }>
                    Make
                </span>
                <select 
                    style = {
                                {
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    paddingLeft: '10px',
                                    borderRadius: '10px'
                                }
                            }
                            name="make"
                            id="make"
                            onChange={SearchCarsByMake}
                >
                    {
                        makes.length === 0? (
                            <option value=''>No data found</option>
                        ):(
                            <>
                                <option disabled defaultValue> -- All --</option>
                                {makes.map((make, index) => (
                                    <option key={index} value={make}>
                                        {make}
                                    </option>
                                ))}
                            </>
                        )
                    }
                </select>


            </div>
            
        </div>
    );
    
};

export default SearchCars;