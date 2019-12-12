import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import {service, saveAddress} from "../service"


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
    adressBlock: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    continueButton: {
        backgroundColor: '#47B752',
        height: 45,
        color: '#fff',
        marginTop: 30,
        boxShadow: 'none',
        width: 180
    },

});

const countries = ["Россия", "Украина", "Казахстан"];

export default function DeliveryForm() {
    const classes = useStyles();
    const [country, setCountry] = useState('Россия');
    const [state, setState] = useState({
        name: '',
        city: '',
        address: '',
        zip: '',
    });
    /*const countries = service();*/

    const handleChange = event => {
        setCountry(event.target.value);
    };

    const handleChangeData = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSaveAddress = () => {
        saveAddress()
    }

    const userForm = () => {

    }


    return (
        <div className={classes.formContent}>
            <form>
                <h3 className={classes.deliveryHeader}>Информация для доставки</h3>
                <Typography className={classes.labelSize}>Получатель</Typography>
                <TextField
                    fullWidth
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
                        autocomplete="shipping address-level2"
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
                        autocomplete="shipping street-address"
                        value={state.address}
                        onChange={handleChangeData('address')}
                    />
                    <div className={classes.adressBlock}>
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
                            variant="outlined"
                            placeholder="Индекс"
                            size="small"
                            name="ship-zip"
                            required
                            id="frmZipS"
                            autocomplete="shipping postal-code"
                            value={state.zip}
                            onChange={handleChangeData('zip')}
                        />
                    </div>
                </div>
                <Button onClick={saveAddress(state.name, state.city, state.address, country, state.zip)} variant="contained" className={classes.continueButton}>Продолжить</Button>
            </form>
        </div>
    )

}