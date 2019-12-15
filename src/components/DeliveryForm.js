import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Input, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {service, saveAddress} from "../service";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PaymentCheck from "./PaymentCheck";
import InputMask from "react-input-mask";
import {observer} from "mobx-react-lite"
import {observable} from "mobx"

const useStyles = makeStyles({
    deliveryHeader: {
        color: '#101D94',
        fontSize: '18pt',
        fontWeight: 'lighter',
        marginTop: 40,
        marginBottom: 30,

    },
    labelSize: {
        color: '#101D94',
        fontSize: '16pt',
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
    buttonRoot: {
        textTransform: 'none',
        padding: 0,

    },
    formContent: {
        padding: '22px 40px',
    },
    cardNumberInput: {
        height: 17,
        borderRadius: 4,
        width: 298,
        border: '1px solid #c4c4c4',
        padding: '10.5px 10.5px',
        outline: 'none',
        color: '#000',
        fontSize: 16,

        '&:focus': {
            boxShadow: 'inset 0 0 0 1px rgb(57, 83, 162)',
            border: '1px solid rgb(57, 83, 162)',
            color: '#000',
            '&:hover': {
                border: '1px solid rgb(57, 83, 162)',
            },
        },
        '&:hover': {
            border: '1px solid #000',
        },
        '&::placeholder': {
            color: 'rgb(162, 162, 162)',
            fontSize: 14,
        },
    },

    cardNumberError: {
        border: '1px solid red',
        '&:focus': {
            boxShadow: 'inset 0 0 0 1px red',
            border: '1px solid red',
            '&:hover': {
                border: '1px solid red',
            },
        },
        '&:hover': {
            border: '1px solid red',
        },
    },
    cardDateInput: {
        fontSize: 16,
        borderRadius: 4,
        height: 17,
        width: 72,
        border: '1px solid #c4c4c4',
        padding: '10.5px 10.5px',
        outline: 'none',
        color: '#000',

        '&:focus': {
            boxShadow: 'inset 0 0 0 1px rgb(57, 83, 162)',
            border: '1px solid rgb(57, 83, 162)',
            color: '#000',
            '&:hover': {
                border: '1px solid rgb(57, 83, 162)',
            },
        },
        '&::placeholder': {
            color: 'rgb(162, 162, 162)',
            fontSize: 14,
        },
        '&:hover': {
            border: '1px solid #000',
        },
    },
    cardDateInputError: {
        border: '1px solid red',
        '&:focus': {
            boxShadow: 'inset 0 0 0 1px red',
            border: '1px solid red',
            '&:hover': {
                border: '1px solid red',
            },
        },
        '&:hover': {
            border: '1px solid red',
        },
    },
});

const countries = ["Россия", "Украина", "Казахстан"];

export const DeliveryForm = observer(() => {
    const classes = useStyles();
    const [country, setCountry] = useState('Россия');
    const [isOk, setIsOk] = useState(1);
    const [step, setStep] = useState(1);
    const [isCardNumberError, setIsCardNumberError] = useState(() => observable.box(false));
    const [isCardDateError, setIsCardDateError] = useState(() => observable.box(false));
    const [isCvvError, setIsCvvError] = useState(() => observable.box(false));
    const [state, setState] = useState(() => observable({
        name: '',
        city: '',
        address: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        cardDate: '',
        cvv: '',
    }));
    const M1 = /[0-1]/;
    const M2 = /[0-9]/;
    const M3 =  /[1-2]/;
    const Y = /[0-9]/;
    const [mask, setMask] = useState(() => observable([M1, M2, "/", Y, Y]));

    const handleChange = event => {
        setCountry(event.target.value);
    };

    const handleChangeData = name => event => {
        setState({...state, [name]: event.target.value});
        if (state.cardDate.charAt(0) === '0') {
            setMask([M1, M2, "/", Y, Y])
        } else if (state.cardDate.charAt(0) === '1') {
            setMask([M1, M3, "/", Y, Y])
        }
    };

    const handleSaveAddress = (event) => {
        event.preventDefault();
        if (/\d/.test(state.name) || state.zip.length > 7 || state.name.length === 0 || state.length === 0 || state.address === 0 || state.zip === 0) {
            setIsOk(3)
        } else {
            setStep(2)
        }
    };

    const handleSavePay = (event) => {
        event.preventDefault();
        if (/\d/.test(state.cardName) || state.cardName.length === 0 || state.cvv.length > 3) {
            setIsOk(3)
        } else {
            setIsOk(2);
        }
    };

    const prevStep = () => {
        setStep(1);
        setIsOk(1);
    };

    useEffect(() => {
        if (isOk === 2 && step === 2) {
            saveAddress(state.name, state.city, state.address, country, state.zip, state.cardName, state.cardNumber, state.cardDate, state.cvv);
            setStep(3)
        }
    }, [isOk, step, state.name, state.city, state.address, country, state.zip, state.cardName, state.cardNumber, state.cardDate, state.cvv]);

    useEffect(() => {
        if (state.cardNumber.length < 19 && state.cardNumber.length !== 0) {
            setIsCardNumberError(true)
        } else if (state.cardNumber.length === 19 || state.cardNumber.length === 0) {
            setIsCardNumberError(false)
        }
    }, [isCardNumberError, state.cardNumber]);

    useEffect(() => {
        if (state.cardDate.length < 5 && state.cardDate.length > 0) {
            setIsCardDateError(true)
        } else if (state.cardDate.length === 5 || state.cardDate.length === 0) {
            setIsCardDateError(false)
        }
    }, [isCardDateError, state.cardDate]);

    useEffect(() => {
        if (state.cvv.length < 3 && state.cvv.length > 0) {
            setIsCvvError(true)
        } else if (state.cvv.length === 3 || state.cvv.length === 0) {
            setIsCvvError(false)
        }
    }, [isCvvError, state.cvv]);

    const deliveryForm = () => {
        return (
            <>
                <form onSubmit={handleSaveAddress}>
                    <h3 className={classes.deliveryHeader}>Информация для доставки</h3>
                    <Typography className={classes.labelSize}>Получатель</Typography>
                    <TextField
                        fullWidth
                        error={/[!@#$%^&*()_+~`"№;:.,/|?><[\d]/.test(state.name)}
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
                                error={state.zip.length > 6 || /[!@#$%^&*()_+~`"№;:.,/|?><[\D]/.test(state.zip)}
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
                            disabled={/[!@#$%^&*()_+~`"№;:.,/|?>[<\d]/.test(state.name) || state.zip.length > 6 || state.zip.length < 5 || state.name.length === 0 || state.city.length === 0 || state.address.length === 0 || state.zip.length === 0 || /[!@#$%^&*()_+~`"№;:.,/|?><[\D]/.test(state.zip)}>
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
                        error={/[!@#$%^\/&*()_+,|А-я/?><\d]/.test(state.cardName)}
                        variant="outlined"
                        placeholder="KONSTANTIN IVANOV"
                        size="small"
                        name="ccname"
                        id="frmNameCC"
                        required
                        autoComplete="cc-name"
                        value={state.cardName.toLocaleUpperCase()}
                        onChange={handleChangeData('cardName')}
                    />
                    <div style={{marginTop: 23}}>
                        <Typography className={classes.labelSize}>Номер карты</Typography>
                        <InputMask mask="9999 9999 9999 9999"
                                   maskPlaceholder={null}
                                   required
                                   placeholder="XXXX XXXX XXXX XXXX"
                                   name="cardnumber"
                                   id="frmCCNum"
                                   autoComplete="cc-number"
                                   className={isCardNumberError === true ? classes.cardNumberError + ' ' + classes.cardNumberInput : classes.cardNumberInput}
                                   value={state.cardNumber}
                                   onChange={handleChangeData('cardNumber')}
                        />
                        <div className={classes.payBlock}>
                            <div>
                                <Typography className={classes.labelSize}>Срок</Typography>
                                <InputMask mask={mask}
                                           maskPlaceholder={null}
                                           placeholder="MM / YY"
                                           name="cc-exp"
                                           id="frmCCExp"
                                           required
                                           autoComplete="cc-exp"
                                           className={isCardDateError === true ? classes.cardDateInputError + ' ' + classes.cardDateInput : classes.cardDateInput}
                                           value={state.cardDate}
                                           onChange={handleChangeData('cardDate')}
                                />
                            </div>
                            <div style={{marginLeft: 30}}>
                                <Typography className={classes.labelSize}>CVV</Typography>
                                <InputMask mask="999"
                                           maskPlaceholder={null}
                                           variant="outlined"
                                           size="small"
                                           name="cvc"
                                           placeholder="•••"
                                           type="password"
                                           id="frmCCCVC"
                                           required
                                           autoComplete="cc-csc"
                                           style={{
                                               width: 95,
                                           }}
                                           onChange={handleChangeData('cvv')}
                                           className={isCvvError === true ? classes.cardNumberError + ' ' + classes.cardNumberInput : classes.cardNumberInput}
                                           value={state.cvv}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit"
                            variant="contained"
                            className={classes.continueButton}
                            disabled={/[!@#$%^&*()_+.,|?><\dА-я]/.test(state.cardName) || state.cvv.length > 3 || state.cardName.length === 0 || state.cvv.length === 0 || /\D/.test(state.cvv) || state.cardNumber.length < 19 || state.cardDate.length < 5 || state.cardDate.length === 0}>
                        Оплатить
                    </Button>
                </form>
            </>
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
                <Button disabled={step === 1 && isOk !== 2} style={{color: step === 2 ? '#101D94' : '#979797'}}
                        onClick={() => {
                            setIsOk(1);
                            setStep(2);
                        }} variant="text"
                        classes={{
                            root: classes.buttonRoot
                        }}>
                    Оплата
                </Button>
            </Breadcrumbs>
            {
                step === 1 ? (deliveryForm()) : (
                    step === 2 ? payForm() : <PaymentCheck/>
                )
            }
        </div>
    )
});

export default DeliveryForm