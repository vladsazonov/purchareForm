import React from "react";

let userData = {
    name: '',
    city: '',
    address: '',
    country: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardDate: '',
    cvv: '',
};

export function service() {
    return (
        userData
    )
}

export const saveAddress = (Name, City, Address, Country, Zip, CardName, CardNumber, CardDate, Cvv,) => {
    userData = {
        name: Name,
        city: City,
        address: Address,
        country: Country,
        zip: Zip,
        cardName: CardName,
        cardNumber: CardNumber,
        cardDate: CardDate,
        cvv: Cvv,
    };
};