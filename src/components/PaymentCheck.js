import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {service} from  "../service"

const useStyles = makeStyles({
    blockInfo: {
        margin: '10px 0 10px 25px'
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