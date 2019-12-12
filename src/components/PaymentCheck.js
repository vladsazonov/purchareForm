import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {service} from  "../service"

const useStyles = makeStyles({
    deliveryHeader: {
        color: '#101D94',
        fontSize: '19pt',
        fontFamily: 'Helvetica',
        fontWeight: 'lighter',
        marginTop: 40,
        marginBottom: 30,

    },
    labelSize: {
        color: '#101D94',
        fontSize: '16pt',
        fontFamily: 'Helvetica',
        fontWeight: 'lighter',
    },
    inputPosition: {
        marginTop: 10,
    },
    inputCountry: {
        marginTop: 10,
        width: 180
    },
    inputIndex: {
        marginTop: 10,
        width: 120
    },
    addressBlock: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    payBlock: {
        display: 'flex',
        marginTop: 23,
    },
    continueButton: {
        backgroundColor: '#47B752',
        height: 45,
        color: '#fff',
        marginTop: 30,
        boxShadow: 'none',
        width: 180,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#4dcf59'
        },
    },
    lol: {
        position: 'absolute',
    },
    kek: {
        height: 500,
    },
    buttonRoot: {
        textTransform: 'none',
        padding: 0,

    },
    formContent: {
        padding: '22px 40px',
    },
    blockInfo: {
        margin: '10px 0 10px 25px'
    },
    cardNumberInput: {
        height: 17,
        borderRadius: 4,
        width: 298,
        border: '1px solid #c4c4c4',
        padding: '10.5px 10.5px',
        color: '#a2a2a2',
    },
    cardDateInput: {
        fontSize: 16,
        height: 17,
        width: 72,
        borderRadius: 4,
        border: '1px solid #c4c4c4',
        padding: '10.5px 10.5px',
        color: '#a2a2a2',
    },
});

export default function PaymentCheck() {
    const check = service();
    const classes = useStyles();

    return (
        <div style={{marginTop: 20}}>
            <Typography variant="h6" style={{color: 'green'}}>Статус платежа: исполнен</Typography>
            <Typography variant='h5'>Получатель</Typography>
            <div className={classes.blockInfo}>
                <Typography>ФИО: {check.name}</Typography>
            </div>
            <Typography variant='h5'>Адрес</Typography>
            <div className={classes.blockInfo}>
                <Typography>Город: {check.city}</Typography>
                <Typography>Адрес: {check.address}</Typography>
                <Typography>Страна: {check.country}</Typography>
                <Typography>Почтовый индекс: {check.zip}</Typography>
            </div>
            <Typography variant='h5'>Данные об оплате</Typography>
            <div className={classes.blockInfo}>
                <Typography>Имя держателя карты: {check.cardName}</Typography>
                <Typography>Номер карты: {check.cardNumber}</Typography>
                <Typography>Действительна до: {check.cardDate}</Typography>
                <Typography>CVV: {check.cvv}</Typography>
            </div>
        </div>
    )
};