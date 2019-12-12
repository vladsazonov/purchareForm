import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {service, saveAddress} from "../service";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MaskedInput from 'react-text-mask';

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

const countries = ["Россия", "Украина", "Казахстан"];

export default function DeliveryForm() {
    const classes = useStyles();
    const [country, setCountry] = useState('Россия');
    const [isOk, setIsOk] = useState(1);
    const [step, setStep] = useState(1);
    const [state, setState] = useState({
        name: '',
        city: '',
        address: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        cardDate: '/',
        cvv: '',
    });

    const check = service();

    const handleChange = event => {
        setCountry(event.target.value);
    };

    const handleChangeData = name => event => {
        setState({...state, [name]: event.target.value});
    };

    const handleSaveAddress = (event) => {
        event.preventDefault();
        if (/\d/.test(state.name) || state.zip.length > 7 || state.name.length === 0 || state.length === 0 || state.address === 0 || state.zip === 0) {
            console.log('ne verno');
            setIsOk(3)
        } else {
            console.log('verno');
            setStep(2)
        }
    };
    const handleSavePay = (event) => {
        event.preventDefault();
        if (/\d/.test(state.cardName) || state.cardName.length === 0 || state.cvv.length > 4) {
            console.log('ne verno');
            setIsOk(3)
        } else {
            console.log('verno');
            setIsOk(2);
        }
    };

    const prevStep = () => {
        setStep(1);
        setIsOk(1);
    };

    useEffect(() => {
        if (isOk === 2 && step === 2) {
            console.log('useeffect');
            saveAddress(state.name, state.city, state.address, country, state.zip, state.cardName, state.cardNumber, state.cardDate, state.cvv);
            setStep(3)
        }
    });

    const deliveryForm = () => {
        return (
            <>
                <form onSubmit={handleSaveAddress}>
                    <h3 className={classes.deliveryHeader}>Информация для доставки</h3>
                    <Typography className={classes.labelSize}>Получатель</Typography>
                    <TextField
                        fullWidth
                        error={/\d/.test(state.name)}
                        variant="outlined"
                        placeholder="ФИО"
                        size="small"
                        name="name"
                        id="name"
                        required
                        autoComplete="name"
                        value={state.name}
                        onChange={handleChangeData('name')}

                    />
                    <div style={{marginTop: 38}}>
                        <Typography className={classes.labelSize}>Адрес</Typography>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            placeholder="Город"
                            size="small"
                            name="ship-city"
                            id="frmCityS"
                            autoComplete="shipping address-level2"
                            value={state.city}
                            onChange={handleChangeData('city')}
                        />
                        <TextField
                            className={classes.inputPosition}
                            required
                            fullWidth
                            name="ship-address"
                            id="frmAddressS"
                            variant="outlined"
                            placeholder="Адрес"
                            size="small"
                            autoComplete="shipping street-address"
                            value={state.address}
                            onChange={handleChangeData('address')}
                        />
                        <div className={classes.addressBlock}>
                            <TextField
                                className={classes.inputCountry}
                                select
                                variant="outlined"
                                placeholder="Страна"
                                size="small"
                                value={country}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}>
                                {countries.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                className={classes.inputIndex}
                                error={state.zip.length > 7}
                                variant="outlined"
                                placeholder="Индекс"
                                size="small"
                                name="ship-zip"
                                required
                                id="frmZipS"
                                autoComplete="shipping postal-code"
                                value={state.zip}
                                onChange={handleChangeData('zip')}
                            />
                        </div>
                    </div>
                    <Button type="submit"
                            variant="contained"
                            className={classes.continueButton}
                            disabled={/\d/.test(state.name) || state.zip.length > 7 || state.name.length === 0 || state.city.length === 0 || state.address.length === 0 || state.zip.length === 0}>
                        Продолжить
                    </Button>
                </form>
            </>
        )
    };

    const payForm = () => {
        return (
            <>
                <form onSubmit={handleSavePay}>
                    <h3 className={classes.deliveryHeader}>Оплата</h3>
                    <Typography className={classes.labelSize}>Имя на карте</Typography>
                    <TextField
                        fullWidth
                        error={/\d/.test(state.cardName)}
                        variant="outlined"
                        placeholder="Konstantin Ivanov"
                        size="small"
                        name="ccname"
                        id="frmNameCC"
                        required
                        autoComplete="cc-name"
                        value={state.cardName}
                        onChange={handleChangeData('cardName')}
                    />
                    <div style={{marginTop: 23}}>
                        <Typography className={classes.labelSize}>Номер карты</Typography>
                        <MaskedInput
                            required
                            mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                            fullWidth
                            className={classes.cardNumberInput}
                            error={/\D/.test(state.cardNumber)}
                            variant="outlined"
                            placeholderChar='X'
                            size="small"
                            showMask
                            name="cardnumber"
                            id="frmCCNum"
                            autoComplete="cc-number"
                            value={state.cardNumber}
                            onChange={handleChangeData('cardNumber')}
                        />
                        <div className={classes.payBlock}>
                            <div>
                                <Typography className={classes.labelSize}>Срок</Typography>
                                <MaskedInput
                                    mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                                    className={classes.cardDateInput}
                                    placeholderChar='#'
                                    variant="outlined"
                                    placeholder="Срок"
                                    size="small"
                                    name="cc-exp"
                                    id="frmCCExp"
                                    required
                                    autoComplete="cc-exp"
                                    showMask
                                    value={state.cardDate}
                                    onChange={handleChangeData('cardDate')}
                                />
                            </div>
                            <div style={{marginLeft: 30}}>
                                <Typography className={classes.labelSize}>CVV</Typography>
                                <TextField
                                    error={state.cvv.length > 4}
                                    variant="outlined"
                                    type="password"
                                    size="small"
                                    num
                                    name="cvc"
                                    id="frmCCCVC"
                                    required
                                    autoComplete="cc-csc"
                                    value={state.cvv}
                                    style={{
                                        width: 95,
                                    }}
                                    onChange={handleChangeData('cvv')}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit"
                            variant="contained"
                            className={classes.continueButton}
                            disabled={/\d/.test(state.cardName) || state.cvv.length > 4 || state.cardName.length === 0 || state.cvv.length === 0}>
                        Оплатить
                    </Button>
                </form>
            </>
        )
    };

    const payCheck = () => {
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

    return (
        <div className={classes.formContent}>
            <Breadcrumbs separator={<NavigateNextIcon/>}>
                <Button onClick={prevStep} style={{color: step === 1 ? '#101D94' : '#979797'}} variant="text" classes={{
                    root: classes.buttonRoot
                }}>
                    Доставка
                </Button>
                <Button disabled={step === 1 && isOk !== 2} style={{color: step === 2 ? '#101D94' : '#979797'}} onClick={() => setStep(2)} variant="text"
                        classes={{
                            root: classes.buttonRoot
                        }}>
                    Оплата
                </Button>
            </Breadcrumbs>
            {
                step === 1 ? (deliveryForm()) : (
                    step === 2 ? payForm() : payCheck()
                )
            }
        </div>
    )

}